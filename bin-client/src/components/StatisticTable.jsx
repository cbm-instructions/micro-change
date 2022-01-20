import { Table } from 'antd';
import {useEffect, useState} from "react";
import {getDataFromFile} from "../utils/utils";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const StatisticTable = () => {
    const filePath = "./data/measuredDays.txt";
    let [tableData,setTableData] = useState(getDataFromFile(filePath));

    useEffect(() => {
        const interval = setInterval(() => {
            setTableData([...getDataFromFile(filePath)]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const columns = [
        {
            title: 'Tag',
            dataIndex: 'day',
            key: 'day',
            sorter: {
                compare: (a, b) => a.day - b.day,
            },
        },
        {
            title: 'Gewicht',
            dataIndex: 'weight',
            key: 'weight',
            sorter: {
                compare: (a, b) => a.weight - b.weight,
            },
            render: (weight) => (weight/1000).toFixed(2) + " Kg"
        },
        {
          title: "Datum",
          dataIndex: "date",
          key: "date",
        },
        {
            title: "Mülleimer geleert",
            dataIndex: "emptied",
            key: "emptied",
            render: (emptied) => emptied ? <CheckOutlined /> : <CloseOutlined />
        }
    ];


    return <Table
        bordered={true}
        size={"small"}
        columns={columns}
        dataSource={tableData}
        pagination={{ pageSize: 5}}
        rowKey={"date"}
    />;
 }

 export default StatisticTable;