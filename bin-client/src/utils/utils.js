import baumtoeter from "../images/baumtoeter.png";
import equal from "../images/equal.png";
import house from "../images/house.png";
import sadFace from "../images/sad_face.png";
import start from "../images/start.png";
import thumbsUp from "../images/thumbs_up.png";
import vorbild from "../images/vorbild.png";
import thumbsDown from "../images/thumbDown.png";
import {AchievementNames} from "./achievementNames";
import {message} from "antd";
import Achievement from "../components/Achievement";

/**
 * Erzeugt popup von Achievement
 * @param title
 * @param description
 */
export function showAchievement({ title, description }) {
    message.open({
        content: <Achievement title={title} description={description}/>,
    });
}

/**
 * Findet Bild von Achievement nach Titel und liefert es
 * @param title
 * @returns {null}
 */
export const getImageForAchievement = (title) => {
    let img;

    switch (title){
        case AchievementNames.Baumtoeter:
            img = baumtoeter;
            break;
        case AchievementNames.Vorbild:
            img = vorbild;
            break
        case AchievementNames.AllerAnfang:
            img = start;
            break;
        case AchievementNames.AllesBleibt:
            img = equal;
            break;
        case AchievementNames.RichtigerWeg:
            img = thumbsUp;
            break;
        case AchievementNames.WinStreak:
            img = house;
            break;
        case AchievementNames.FalscherWeg:
            img = thumbsDown;
            break;
        default:
            img = null;
            break;
    }

    return img;
}

/**
 * Liest übergebene Datei(Path) und sendet die daten als JSON zurück
 * @param path
 * @returns {*[]|any}
 */
export const getDataFromFile = (path) => {
    const fs = window.require("fs");
    const data  = fs.readFileSync(path,"utf-8");
    if(data){
        return JSON.parse(data)
    }else{
        return [];
    }
}

/**
 * Setzt alle statistiken zurück
 */
export const resetStatistics = () => {
    const fs = window.require("fs");

    const fileNames = fs.readdirSync("./.data/");

    //Delete all data from scale
    fileNames.forEach((file) => {
        fs.unlink("./.data/"+file, (err) => {
            if (err) {
                throw err;
            }
        });
    })

    //Reset points
    fs.writeFile("./data/points.txt","0", function(err) {
        if(err) {
            throw err;
        }
    });

    //Reset achievements
    fs.writeFile("./data/reachedAchievements.txt","[]", function(err) {
        if(err) {
            throw err;
        }
    });

    //Reset statistic
    fs.writeFile("./data/table_data.txt","[]", function(err) {
        if(err) {
            throw err;
        }
    });
}