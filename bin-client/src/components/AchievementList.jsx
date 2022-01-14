import {Button, Card, Col, Row, Space} from 'antd';
import {useEffect, useState} from "react";
import {getDataFromFile, getImageForAchievement} from "../utils/utils";
import Title from "antd/es/typography/Title";

const AchievementList = () => {
    const achievementFilePath = "./data/reachedAchievements.txt";
    const pointsFilePath = "./data/points.txt";

    let [reachedAchievements,setReachedAchievements] = useState(getDataFromFile(achievementFilePath));
    let [points, setPoints] = useState(getDataFromFile(pointsFilePath));

    useEffect(() => {
        const interval = setInterval(() => {
            setReachedAchievements([...getDataFromFile(achievementFilePath)]);
            setPoints(getDataFromFile(pointsFilePath));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if(reachedAchievements === undefined || reachedAchievements.length === 0){
        return (<Title level={2}>No Achievements earned</Title>);
    }else{
        return (
            <div className="site-card-wrapper">
                {/*<Title level={4}>Gesammelte Punkte: {points}</Title>*/}
                <Row gutter={16}>
                    {
                        reachedAchievements.map(el => {
                            return (
                                <Col key={el.title} span={8}>
                                    <Card  title={<img width={90} height={90} src={getImageForAchievement(el.title)} alt={"No pic. available"}/>}>
                                        <Space style={{display: "inline-block",verticalAlign: "middle"}}>
                                            {/*<div>
                                                Punkte{"  "}
                                                <Button color="grey" size="large" disabled shape="circle">
                                                    <p style={{color: "black"}}>{el.points}</p>
                                                </Button>
                                            </div>*/}
                                            <Title level={5}>"{el.title}"</Title>
                                            <p>{el.description}</p>
                                        </Space>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
        );
    }
}

export default AchievementList;