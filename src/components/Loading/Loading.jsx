import classes from "./Loading.module.scss"
import {PuffLoader} from "react-spinners";

function Loading({ text, divOverlay }) {

    let viewClass = divOverlay ? `${classes.generalSetting} ${classes.divOverlay}` : `${classes.generalSetting} ${classes.fullScreen}`

    return (
        <div className={viewClass}>

            <PuffLoader
                loading
                speedMultiplier={1}
            />
            <p>{text}</p>
        </div>
    );
}

export default Loading;