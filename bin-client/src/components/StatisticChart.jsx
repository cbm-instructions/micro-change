import { Line  } from '@ant-design/charts';
import {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import {getDataFromFile} from "../utils/utils";

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
    const filePath = "./data/week_data.txt";

    let [chartData,setChartData] = useState(convertToChartFormat(getDataFromFile(filePath)));

    useEffect(() => {
        const interval = setInterval(() => {
            setChartData([...convertToChartFormat(getDataFromFile(filePath))]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const config = {
        data: chartData,
        padding: 'auto',
        title: "Statistik des Müllverbrauchs",
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
        return (<Title level={2}>No Statistic available</Title>);
    }else{
        return (<Line {...config} />);
    }

}

export default StatisticChart;