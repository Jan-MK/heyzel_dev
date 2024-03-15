import styles from "./Skeleton.module.scss"
import Skeleton from "./Skeleton.jsx";
import {IoChevronBackOutline, IoTrashOutline} from "react-icons/io5";
import classes from "../../pages/JobForm/JobForm.module.scss";

function SkeletonJob(props) {
    return (
        <div className={`${styles.skeleton} ${styles.col} ${styles.fullPage}`}>
            <div className={`${styles.skeleton} ${styles.topNav} ${styles.animatePulse}`}>
                <div className={`${styles.skeleton} ${styles.title} ${styles.width25}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.center} ${styles.col} ${styles.animatePulse}`}>
                <div className={`${styles.skeleton} ${styles.logo}`}></div>
                <div className={`${styles.skeleton} ${styles.text} ${styles.width50} ${styles.height25}`}></div>
                <div className={`${styles.skeleton} ${styles.text} ${styles.width50} ${styles.height15}`}></div>
                <div className={`${styles.skeleton} ${styles.text} ${styles.width50} ${styles.height25}`}></div>
                <div className={`${styles.skeleton} ${styles.text} ${styles.width50} ${styles.height15}`}></div>
            </div>
            <div className={`${styles.skeleton} ${styles.botNav} ${styles.animatePulse}`}>
                <div className={`${styles.skeleton} ${styles.title} ${styles.width50}`}></div>
                <div className={`${styles.skeleton} ${styles.row} ${styles.width50}`}>
                    <div className={`${styles.skeleton} ${styles.btn}`}></div>
                    <div className={`${styles.skeleton} ${styles.btn}`}></div>
                </div>
            </div>
        </div>

    );
}

export default SkeletonJob;