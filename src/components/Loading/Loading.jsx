import classes from "./Loading.module.scss"
import {PuffLoader} from "react-spinners";

function Loading({ text }) {

    return (
        <div className={classes.resetScreen}>

            <PuffLoader
                loading
                speedMultiplier={1}
            />
            <p>{text}</p>
        </div>
    );
}

export default Loading;