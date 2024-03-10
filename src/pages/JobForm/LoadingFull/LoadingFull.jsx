import classes from "./Reset.module.scss"
import {PuffLoader} from "react-spinners";

function LoadingFull({ text }) {

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

export default LoadingFull;