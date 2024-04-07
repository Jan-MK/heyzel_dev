import classes from "./Submitted.module.scss"

function Submitted({divOverlay, success, heading, text}) {

    let viewClass = divOverlay ? `${classes.generalSetting} ${success ? classes.success : classes.error} ${classes.divOverlay}` : `${classes.generalSetting} ${classes.fullScreen}`

    return (
        <div className={viewClass}>
            <h2>{heading}</h2>
            <p>{text}</p>
        </div>
    );
}

export default Submitted;