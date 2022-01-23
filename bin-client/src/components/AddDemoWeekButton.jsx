import {Button} from "antd";
import {useEffect, useState} from "react";

const AddDemoWeekButton = () => {

    const fs = window.require("fs");
    const [fileNumber,setFileNumber] = useState(1);

    const demoDataDir = "./demoData/";

    useEffect(() => {
        if(fileNumber >= 5){
            setFileNumber(1);
        }
    },[fileNumber])

    const addDemoWeek = () => {
        const dirNames = fs.readdirSync(demoDataDir);

        dirNames.forEach((dirName) => {
            if(parseInt(dirName.substring(0)) === fileNumber){
                const fileNames = fs.readdirSync(demoDataDir+dirName);
                fileNames.forEach((fileName)=>{
                    fs.copyFile(demoDataDir+dirName+"/"+fileName,"scale-sample-data/.data/"+fileName,(err => {
                        if(err) throw err;
                    }));
                });
            }
            setFileNumber(fileNumber+1);
        });
    };

    return (<Button onClick={addDemoWeek}>--- + ---</Button>);
};

export default AddDemoWeekButton;