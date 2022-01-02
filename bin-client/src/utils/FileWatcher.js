function getEmptyElementsIndexes(array) {
    let indexes = [];
    array.forEach(function (el,index) {
        if(el === "" || el === null || el === undefined){
            indexes.push(index)
        }
    })
    return indexes
}

function getMeasuredWeightParseInFile(dirPath,fs) {
    let processedData = [];
    const fileNames = fs.readdirSync(dirPath);
    if(Math.floor(fileNames.length / 7) >= 1){
        let weeks = [];

        let i,j, chunk = 7;
        for (i = 0,j = fileNames.length; i < j; i += chunk) {
            if(Math.floor(fileNames.length - i )/ 7 >= 1){
                weeks.push(fileNames.slice(i, i + chunk));
            }
        }

        weeks.forEach(function (week,index) {
            let data;
            let entries;
            let maxWeights = [];
            let lastResetIndex;
            let tableDataEntry;

            week.forEach(function (fileName) {
                data += fs.readFileSync(dirPath+fileName,"utf-8")+"\n";
            });
            data = data.replace("undefined","")

            entries = data.split(/\r?\n/);

            getEmptyElementsIndexes(entries).forEach(function (index) {
                entries.splice(index,index);
            });

            entries.forEach(function (entry,index) {
                    if(entry.split("|")[2] === "RESET"){
                        lastResetIndex = index;
                        maxWeights.push(parseFloat(entries[index-1].split("|")[1]));
                    }
                }
            );

            if(lastResetIndex < entries.length){
                maxWeights.push(parseFloat(entries[entries.length -1].split("|")[1]));
            }

            tableDataEntry = {
                key: index,
                week: index+1,
                totalWeight: maxWeights.reduce((pv, cv) => pv + cv, 0)
            }

            processedData.push(tableDataEntry)
        });
    }
    fs.writeFile("./data/table_data.txt", JSON.stringify(processedData), function(err) {
        if(err) {
            throw err
        }
    });
}

export function startFileWatcher() {
    const fs = window.require("fs");
    const fileWatcher = window.require("chokidar");
    const dirPath = "./scale-sample-data/.data/";

    const watcher = fileWatcher.watch(dirPath, {
        persistent: true
    });

    watcher.
    on('add', () => getMeasuredWeightParseInFile(dirPath,fs)).
    on('change', () => getMeasuredWeightParseInFile(dirPath,fs)).
    on('error', function(error) {
        throw error;
    });
}
