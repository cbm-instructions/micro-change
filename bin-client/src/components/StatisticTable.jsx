import { Table } from 'antd';
import {useEffect, useState} from "react";
import {getDataFromFile} from "../utils/utils";

function convertToTableFormat(data){
    let formattedData = [];

    data.forEach(function (el){
        formattedData.push({
            week: el.week,
            totalWeight: el.totalWeight,
        })
    });

    return formattedData;
}

const StatisticTable = () => {
    const filePath = "./data/table_data.txt";
    let [tableData,setTableData] = useState(getDataFromFile(filePath));

    useEffect(() => {
        const interval = setInterval(() => {
            setTableData([...convertToTableFormat(getDataFromFile(filePath))]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            title: 'Week',
            dataIndex: 'week',
            key: 'week',
        },
        {
            title: 'Total weight',
            dataIndex: 'totalWeight',
            key: 'totalWeight',
            render: totalWeight => Number(totalWeight/1000).toFixed(2)+" Kg",
        }
    ];


    return <Table columns={columns} dataSource={tableData} />;
 }

 export default StatisticTable;