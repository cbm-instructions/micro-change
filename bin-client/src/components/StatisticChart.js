import { Line  } from '@ant-design/charts';
import {useState} from "react";
import Title from "antd/es/typography/Title";

function convertToChartFormat(data){
    let formattedData = [];

    data.forEach(function (el){
        formattedData.push({
            week: el.week-1,
            weight: parseFloat(Number(el.totalWeight/1000).toFixed(2)),
        })
    });

    return formattedData;
}

const StatisticChart = () => {
    const fs = window.require("fs");
    const fileWatcher = window.require("chokidar");
    const dirPath = "./data/";

    let [chartData,setChartData] = useState(convertToChartFormat(JSON.parse(fs.readFileSync(dirPath+"table_data.txt","utf-8"))));

    const watcher = fileWatcher.watch(dirPath, {
        persistent: true
    });

    watcher.on('add', function() {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        chartData = convertToChartFormat(JSON.parse(content));
        console.log("onAdd")
    }).on('change', function() {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        setChartData(convertToChartFormat(JSON.parse(content)));
        console.log("OnChange")
    }).on('error', function(error) {
        throw error;
    });

    const config = {
        data: chartData,
        padding: 'auto',
        title: {
            visible: true,
            text: "Statistik des Müllverbrauchs"
        },
        xField: "week",
        yField: "weight",
        color: "#2593fc",
        marginRatio: 0,
        smooth: true,
        point: {
            visible:true,
            size: 5,
            shape:"diamond",
            style:{
                fill: "white",
                stroke: "#2593fc",
                lineWidth: 2
            }
        },
    };

    if(chartData === undefined || chartData.length === 0){
        return (<Title level={2}>No data available. Cannot export</Title>);
    }else{
        return (<Line {...config} />);
    }

}

export default StatisticChart;