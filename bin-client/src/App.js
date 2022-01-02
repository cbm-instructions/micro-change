import "antd/dist/antd.css";
import StatisticTable from "./components/StatisticTable";
import {startFileWatcher} from "./utils/FileWatcher";
import StatisticChart from "./components/StatisticChart";

function App() {
    startFileWatcher();
    return (
        <div>
            <StatisticTable/>
            <StatisticChart/>
        </div>
    );
}

export default App;
