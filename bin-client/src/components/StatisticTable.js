import { Table } from 'antd';
import {useState} from "react";

const StatisticTable = () => {

    const fs = window.require("fs");
    const fileWatcher = window.require("chokidar");
    const dirPath = "./data/";

    let [tableData,setTableData] = useState(JSON.parse(fs.readFileSync(dirPath+"table_data.txt","utf-8")));

    const watcher = fileWatcher.watch(dirPath, {
        persistent: true
    });

    watcher.
    on('add', function() {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        tableData = JSON.parse(content);
        console.log("onAdd")
    }).
    on('change', function(path) {
        const content = fs.readFileSync(dirPath+"table_data.txt","utf-8");
        setTableData(JSON.parse(content));
        console.log("OnChange")
    }).
    on('error', function(error) {
        throw error;
    });

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