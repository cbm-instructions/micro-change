import "antd/dist/antd.css";
import {Row, Col, Tabs, Button} from 'antd';
import { TableOutlined, LineChartOutlined, CrownOutlined} from '@ant-design/icons';
import StatisticTable from "./components/StatisticTable";
import {startAchievementWatcher, startFileWatcher} from "./utils/FileWatcher";
import StatisticChart from "./components/StatisticChart";
import AchievementList from "./components/AchievementList";
import {resetStatistics} from "./utils/utils";
import {addDemoWeek} from "./utils/DemonstratorUtils";
import AddDemoWeekButton from "./components/AddDemoWeekButton";

const { TabPane } = Tabs;

function App() {
    startFileWatcher();
    startAchievementWatcher();

    return (
        <div style={{textAlign:"center"}}>
            <Tabs size="large" defaultActiveKey="1" centered>
                <TabPane
                    tab={
                        <span>
                            <TableOutlined />
                            Tabelle
                        </span>
                    }
                    key="1"
                >
                    <Row>
                        <Col span={1}/>
                        <Col span={22}><StatisticTable/></Col>
                        <Col span={1}/>
                    </Row>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <LineChartOutlined />
                            Wochen-Diagramm
                        </span>
                    }
                    key="2"
                >
                    <Row>
                        <Col span={1}/>
                        <Col span={22}><StatisticChart/></Col>
                        <Col span={1}/>
                    </Row>
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <CrownOutlined />
                            Errungenschaften
                        </span>
                    }
                    key="3"
                >
                    <Row>
                        <Col span={1}/>
                        <Col span={22}><AchievementList/></Col>
                        <Col span={1}/>
                    </Row>
                </TabPane>
            </Tabs>
            <Button onClick={resetStatistics} style={{margin:"auto",marginTop:"10px"}} type="primary" danger>Statistik zurücksetzen</Button>
            <AddDemoWeekButton/>
        </div>
    );
}

export default App;
