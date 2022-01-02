import { Column  } from '@ant-design/charts';
import {useState} from "react";
import Title from "antd/es/typography/Title";

function convertToChartFormat(data){
    let formattedData = [];

    data.forEach(function (el){
        formattedData.push({
            week: el.week,
            weight: el.weight
        })
    });

    return formattedData;
}

const StatisticChart = () => {
    let [chartData,setChartData] = useState([]);

    const fs = window.require("fs");
    const fileWatcher = window.require("chokidar");
    const dirPath = "./data/";

    const watcher = fileWatcher.watch(dirPath, {
        persistent: true
    });

    watcher.
    on('add', function() {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        chartData = convertToChartFormat(JSON.parse(content));
    }).
    on('change', function() {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        setChartData(convertToChartFormat(JSON.parse(content)));
    }).
    on('error', function(error) {
        throw error;
    });

    const data = [
        {
            type: '家具家电',
            sales: 38,
        },
        {
            type: '粮油副食',
            sales: 52,
        },
        {
            type: '生鲜水果',
            sales: 61,
        },
        {
            type: '美容洗护',
            sales: 145,
        },
        {
            type: '母婴用品',
            sales: 48,
        },
        {
            type: '进口食品',
            sales: 38,
        },
        {
            type: '食品饮料',
            sales: 38,
        },
        {
            type: '家庭清洁',
            sales: 38,
        },
    ];
    const config = {
        data: chartData,
        xField: 'week',
        yField: 'weight',
        seriesField: 'type',
        marginRatio: 0,
        label: {
            position: 'middle',
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ],
        },
    };

    if(chartData === undefined || chartData.length === 0){
        return (<Title level={2}>No data available. Cannot export</Title>);
    }else{
        return (<Column {...config} />);
    }

}

export default StatisticChart;