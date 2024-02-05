import classes from "./Reset.module.scss"
import {PuffLoader} from "react-spinners";

function Reset(props) {

    return (
        <div className={classes.resetScreen}>

            <PuffLoader
                loading
                speedMultiplier={1}
            />
            <p>Preparing reset...</p>
        </div>
    );
}

export default Reset;