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

/**
 * Liest alle Dateien vom Arduino, sammelt die Information und packt sie als JSON Objekte in table_data.txt
 * @param dirPath
 * @param fs
 */
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
 * Wacht über table_data.txt. Bei Änderung der Datei wird auf errungene Achievements überprüft
 * Falls welche erreicht wurden, erscheinen sie als Pop up und werden als JSON-Objekt in reachedAchievements hinzugefügt
 */
export function startAchievementWatcher() {
    const fileWatcher = window.require("chokidar");
    const tableDataPath = "./data/table_data.txt";

    const watcher = fileWatcher.watch(tableDataPath, {
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
 * Alte vorgehensweise Achievements als Popups darzustellen, falls sie erreicht werden. Useless...
 * @param achievement
 * @returns {boolean}
 */
/*export function startAchievementListener() {
    const fileWatcher = window.require("chokidar");
    const reachedAchievementsPath = "./data/reachedAchievements.txt";

    const watcher = fileWatcher.watch(reachedAchievementsPath, {
        persistent: true,
        awaitWriteFinish: {
            pollInterval: 3000
        },
    });

    watcher.
    on('change', () => {
        const reachedAchievements = getDataFromFile(reachedAchievementsPath);

        if(reachedAchievements.length > 0){
            showAchievement({...reachedAchievements.slice(-1)})
        }
    }).
    on('error', function(error) {
        throw error;
    });
}*/

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

/**
 * Prüft nach ob im Array, in dem sich die gesammelten Wochen, Achievements erreicht wurden. Falls ja und werden sie angezeigt und gespeichert.
 * @param weeks
 */
export function checkOnAchievementsAndChangePoints(weeks) {

    const reachedAchievements = getDataFromFile("./data/reachedAchievements.txt");
    let isReached = false;
    let points =  getPoints();

    if(weeks.length === 1){
        if(!isAchievementReached(AchievementNames.AllerAnfang)){
            points+=10;
            reachedAchievements.push(getAchievementByTitle(AchievementNames.AllerAnfang));
            showAchievement(getAchievementByTitle(AchievementNames.AllerAnfang));
            console.log("warum")
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
