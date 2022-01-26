import {getImageForAchievement} from "../utils/utils";

const Achievement = ({ title }) => {

    const roundImgStyle = {
        borderRadius:"50%",
        float:"left",
        border: "1px solid"
    }

    return (<div style={{width: "170px"}}>
        <img style={roundImgStyle} width={80} height={80} src={getImageForAchievement(title)} alt={"Icon"}/>
        <div>
            <p>Achievement Unlocked</p>
            <p>"{title}"</p>
        </div>

    </div>);

}

export default Achievement;