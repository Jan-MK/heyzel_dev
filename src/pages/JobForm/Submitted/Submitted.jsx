import classes from "./Submitted.module.scss"

function Submitted({ show, response}) {
    return (
        <div className={`${classes.fullscreen} ${show ? classes.show : classes.hide}`}>
            {response}
        </div>
    );
}

export default Submitted;