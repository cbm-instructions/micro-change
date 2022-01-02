
export const mapDataFromFiles = (fs, dirPath) => {
    const fileNames = fs.readdirSync(dirPath);
    let map = new Map();

    fileNames.forEach((fileName) => {
        const fileData = fs.readFileSync(dirPath+fileName,'utf8');
        const lines = fileData.split(/\r?\n/);

        lines.forEach((line) => {
            const date = line.substring(0,9);
            const weight = line.split("|")[1];

            if(line.split("|")[2]){

            }

            if(map.has(date)){
                map.set(date,parseFloat(weight))
            }
        });
    });
}
