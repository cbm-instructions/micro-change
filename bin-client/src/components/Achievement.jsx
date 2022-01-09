import {getImageForAchievement} from "../utils/utils";

const Achievement = ({ points, title }) => {

    const roundImgStyle = {
        //borderRadius:"50%",
        float:"left",
        border: "1px solid"
    }

    return (<div style={{width: "170px"}}>
        <img style={roundImgStyle} width={80} height={80} src={getImageForAchievement(title)} alt={"Icon"}/>
        <p>g3ege4gegher</p>
        <div>
            <p>Achievement Unlocked <b>{points}P</b></p>
            <p>"{title}"</p>
        </div>

    </div>);

}

export default Achievement;