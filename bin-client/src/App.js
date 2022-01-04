import "antd/dist/antd.css";
import { message, Row, Col, Tabs, Button } from 'antd';
import { TableOutlined, LineChartOutlined, PictureOutlined } from '@ant-design/icons';
import StatisticTable from "./components/StatisticTable";
import {startFileWatcher} from "./utils/FileWatcher";
import StatisticChart from "./components/StatisticChart";
import Achievement from "./components/Achievement";

const { TabPane } = Tabs;

const showAchievement= ({ img, points, title, description }) => {
    // TODO: Show img prop
    message.open({
        content: <Achievement points={points} title={title} description={description} />,
        icon: <PictureOutlined />
    })
}

const testAchievement = `{
    "img": "PsyschoAndreasRTL",
    "points": 1,
    "title": "Alles bleibt wie es ist",
    "description": "Verbrauch +- 5% im Vergleich zur Vorwoche",
    "trigger": " "
  }`

function App() {
    startFileWatcher();

    // TODO: Add file watcher that shows achievements when smth happens

    return (
        <div>
            <Tabs size="large" defaultActiveKey="1" centered>
                <TabPane
                    tab={
                        <span>
                            <TableOutlined />
                            Table
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
                            Chart
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
            </Tabs>
            <Button onClick={() => showAchievement(JSON.parse(testAchievement))}>SHOW!</Button>
        </div>
    );
}

export default App;
