import {getDataFromFile, showAchievement} from "./utils";
import {AchievementNames} from "./achievementNames";

/**
 * Findet Indizes von leeren Elementen ("")
 * @param array
 * @returns {*[]}
 */
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
    const fileNames = fs.readdirSync(dirPath);

    let data;
    let stringRows;

    //Daten auslesen und in Zeilen speichern
    fileNames.forEach(function (fileName) {
        data += fs.readFileSync(dirPath+fileName,"utf-8")+"\n";
    });
    data = data.replace("undefined","");

    stringRows = data.split(/\r?\n/);

    processMeasuredDaysData(fs,stringRows);
    processWeekData(fs,dirPath);

}

/**
 * Liest alle Dateien vom Arduino, sammelt die Information und packt sie als JSON Objekte in measuredDays.txt
 * @param fs
 * @param stringRows
 */
export function processMeasuredDaysData(fs,stringRows){
    let measuredData = [];
    let dataOfEachDay = [];
    let processedDaysData = []

    getEmptyElementsIndexes(stringRows).forEach(function (index) {
        stringRows.splice(index,index);
    });

    stringRows.forEach(row => {
        const splitData = row.split("|");
        if(splitData.length < 3){
            measuredData.push({
                date: splitData[0].substring(0,10),
                weight: splitData[1],
                emptied: false
            })
        }else{
            measuredData.push({
                date: splitData[0].substring(0,10),
                weight: splitData[1],
                emptied: true
            })
        }
    });

    let range = 0;
    let oldRange = 0;
    let indexWhenLastDayCreated;

    measuredData.forEach(function(currentDay,index){
        const nextDay = measuredData[index+1];
        range++;
        if(nextDay && currentDay.date !== nextDay.date){
            dataOfEachDay.push(measuredData.slice(oldRange,range));
            oldRange = range;
            indexWhenLastDayCreated = index;
        }

        if(index === measuredData.length-1){
            dataOfEachDay.push(measuredData.slice(indexWhenLastDayCreated+1,index+1));
        }
    });

    dataOfEachDay.forEach(dayData => {
        let totalWeight = 0;
        let dateForDayEntry = dayData[0].date;
        let emptied = false;
        dayData.forEach(function(currentEntry,index){

            const nextEntry = dayData[index+1];

            if(currentEntry.emptied){
                emptied = true;
            }

            if(nextEntry && nextEntry.emptied){
                totalWeight += parseFloat(currentEntry.weight) + parseFloat(nextEntry.weight);
            }

            if(index === dayData.length-1){
                if(totalWeight === 0){
                    totalWeight = parseFloat(currentEntry.weight);
                }else{
                    totalWeight += parseFloat(currentEntry.weight);
                }
            }
        });
        processedDaysData.push({
            date: dateForDayEntry,
            weight: totalWeight,
            tendency: "Start",
            day: processedDaysData.length+1,
            emptied: emptied
        });
    });

    processedDaysData.forEach(function (entry,index){
       if(index>0){
           if(entry.weight > processedDaysData[index-1].weight){
               entry.tendency = "Steigend";
           }else if(entry.weight < processedDaysData[index-1].weight){
               entry.tendency = "Fallend";
           }else if(entry.weight === processedDaysData[index-1].weight){
               entry.tendency = "Gleich";
           }
       }
    });

    fs.writeFile("./data/measuredDays.txt", JSON.stringify(processedDaysData), function(err) {
        if(err) {
            throw err
        }
    });
}

/**
 * Liest alle Dateien vom Arduino, sammelt die Information und packt sie als JSON Objekte in week_data.txt
 * @param dirPath
 * @param fs
 */
function processWeekData(fs,dirPath) {
    let processedData = [];
    const fileNames = fs.readdirSync(dirPath);

    //Ist die Anzahl der Dateien durch zwei teibar? (Wurden genug Tage gemessen, die als Wochen zusammengefasst werden können?)
    if(Math.floor(fileNames.length / 7) >= 1){
        let weeks = [];

        //Erstelle Arrays mit je 7 Dateien
        let i,j, chunk = 7;
        for (i = 0,j = fileNames.length; i < j; i += chunk) {
            if(Math.floor(fileNames.length - i )/ 7 >= 1) {
                weeks.push(fileNames.slice(i, i + chunk));
            }
        }

        //Jede Woche Analysieren
        weeks.forEach(function (week,index) {
            let data;
            let entries;
            let maxWeights = [];
            let lastResetIndex;
            let tableDataEntry;

            //Daten auslesen und in Zeilen speichern
            week.forEach(function (fileName) {
                data += fs.readFileSync(dirPath+fileName,"utf-8")+"\n";
            });
            data = data.replace("undefined","")

            //Zeilen einzeln in ein Array speichern
            entries = data.split(/\r?\n/);

            //Leere Elemente löschen
            getEmptyElementsIndexes(entries).forEach(function (index) {
                entries.splice(index,index);
            });

            //Müllwechsel erkennen
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
                totalWeight: maxWeights.reduce((pv, cv) => pv + cv, 0),
                days: week.length
            }

            processedData.push(tableDataEntry)
        });
    }
    fs.writeFile("./data/week_data.txt", JSON.stringify(processedData), function(err) {
        if(err) {
            throw err
        }
    });
}

/**
 * File Watcher für die Messungs-Dateien.
 */
export function startFileWatcher() {
    const fs = window.require("fs");
    const fileWatcher = window.require("chokidar");
    const dirPath = "./scale-sample-data/.data/";

    const watcher = fileWatcher.watch(dirPath, {
        persistent: true
    });

    watcher.
    on('add', () => {
        getMeasuredWeightParseInFile(dirPath,fs)
    }).
    on('change', () => {
        getMeasuredWeightParseInFile(dirPath,fs)
    }).
    on('error', function(error) {
        throw error;
    });
}

/**
 * Wacht über week_data.txt. Bei Änderung der Datei wird auf errungene Achievements überprüft
 * Falls welche erreicht wurden, erscheinen sie als Pop up und werden als JSON-Objekt in reachedAchievements hinzugefügt
 */
export function startAchievementWatcher() {
    const fileWatcher = window.require("chokidar");
    const tableDataPath = "./data/week_data.txt";
    const scaleDataPath = "./scale-sample-data/.data/"

    const watcher = fileWatcher.watch([tableDataPath,scaleDataPath], {
        persistent: true,
        awaitWriteFinish: {
            pollInterval: 2000
        },
    });

    watcher.
    on('change', () => {
        const weeks = getDataFromFile(tableDataPath);
        checkOnAchievementsAndChangePoints(weeks)
    }).
    on('error', function(error) {
        throw error;
    });
}

/**
 * Schaut in reachedAchievements.txt nach, ob ein Achievement schon erreicht wurde
 * @param achievement
 * @returns {boolean}
 */
export function isAchievementReached(achievement){

    const reachedAchievements = getDataFromFile("./data/reachedAchievements.txt");

    if(reachedAchievements.length > 0){
        if(reachedAchievements.find( el => el.title === achievement)){
            return true;
        }
    }else {
        return false;
    }
}

/**
 * Findet Achievements nach Titel. Titel dient als unquiqe ID
 * @param title
 * @returns {T}
 */
export function getAchievementByTitle(title) {
    const achievements = getDataFromFile("./data/achievements.txt");
    return achievements.find((el) => el.title === title);
}

/**
 * Überschreibt reachedAchievements mit neuen achievments array
 * @param achievements
 */
export function writeAchievements(achievements){
    const fs = window.require("fs");
    fs.writeFileSync("./data/reachedAchievements.txt",JSON.stringify(achievements), function(err) {
        if(err) {
            throw err;
        }
    });
}

/**
 * Liefert punkte aus points.txt
 * @returns {number}
 */
export function getPoints(){
    return parseInt(JSON.parse(getDataFromFile("./data/points.txt")));
}

/**
 * Speichert neue Punkte in points.txt
 * @param points
 */
export function writePoints(points){
    const fs = window.require("fs");
    fs.writeFileSync("./data/points.txt",points.toString(), function(err) {
        if(err) {
            throw err;
        }
    });
}

export function getAmountOfFilesInDir(dirPath){
    const fs = window.require("fs");
    return fs.readdirSync(dirPath).length;
}

/**
 * Prüft nach ob im Array, in dem sich die gesammelten Wochen, Achievements erreicht wurden. Falls ja und werden sie angezeigt und gespeichert.
 * @param weeks
 */
export function checkOnAchievementsAndChangePoints(weeks) {

    const reachedAchievements = getDataFromFile("./data/reachedAchievements.txt");
    let isReached = false;
    let points =  getPoints();

    if(getAmountOfFilesInDir("./scale-sample-data/.data/") === 1){
        if(!isAchievementReached(AchievementNames.AllerAnfang)){
            points+=10;
            reachedAchievements.push(getAchievementByTitle(AchievementNames.AllerAnfang));
            showAchievement(getAchievementByTitle(AchievementNames.AllerAnfang));
            isReached = true;
        }
    }

    if(weeks.length >= 2){
        const lastTwoWeeks = weeks.slice(-2);
        const secondWeek = lastTwoWeeks[1];
        const firstWeek = lastTwoWeeks[0];

        if(secondWeek.totalWeight > (firstWeek.totalWeight * 2)){
            points-=40;
            if(!isAchievementReached(AchievementNames.Baumtoeter)){
                reachedAchievements.push(getAchievementByTitle(AchievementNames.Baumtoeter));
                showAchievement(getAchievementByTitle(AchievementNames.Baumtoeter));
                isReached = true;
            }
        }

        if(secondWeek.totalWeight <= (firstWeek.totalWeight / 2)){
            points+=50;
            if(!isAchievementReached(AchievementNames.Vorbild)){
                reachedAchievements.push(getAchievementByTitle(AchievementNames.Vorbild));
                showAchievement(getAchievementByTitle(AchievementNames.Vorbild));
                isReached = true;
            }
        }

        if(secondWeek.totalWeight <= (firstWeek.totalWeight-((firstWeek.totalWeight/100)*5)) ){
            points+=20;
            if(!isAchievementReached(AchievementNames.RichtigerWeg)){
                reachedAchievements.push(getAchievementByTitle(AchievementNames.RichtigerWeg));
                showAchievement(getAchievementByTitle(AchievementNames.RichtigerWeg));
                isReached = true;
            }
        }

        const fivePercentMore = firstWeek.totalWeight + ((firstWeek.totalWeight/100)*5);
        const fivePercentLess = firstWeek.totalWeight - ((firstWeek.totalWeight/100)*5);
        if((secondWeek.totalWeight >= firstWeek && secondWeek.totalWeight <= fivePercentMore) || (secondWeek <= firstWeek && secondWeek >= fivePercentLess)){
            points+=1;
            if(!isAchievementReached(AchievementNames.AllesBleibt)){
                reachedAchievements.push(getAchievementByTitle(AchievementNames.AllesBleibt));
                showAchievement(getAchievementByTitle(AchievementNames.AllesBleibt));
                isReached = true;
            }
        }
    }

    if(weeks.length >= 3){
        const lastThreeWeeks = weeks.slice(-3);
        if((lastThreeWeeks[0].totalWeight < lastThreeWeeks[1].totalWeight) && (lastThreeWeeks[1].totalWeight < lastThreeWeeks[2].totalWeight)){
            points+=100;
            if(!isAchievementReached(AchievementNames.WinStreak)){
                reachedAchievements.push(getAchievementByTitle(AchievementNames.WinStreak));
                showAchievement(getAchievementByTitle(AchievementNames.WinStreak));
                isReached = true;
            }
        }
    }

    if(isReached){
        writeAchievements(reachedAchievements);
    }
    writePoints(points);
}
