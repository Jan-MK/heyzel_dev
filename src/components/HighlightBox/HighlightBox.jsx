import classes from "./HighlightBox.module.scss"
import {Link} from "react-router-dom";
import {IoArrowForward} from "react-icons/io5";

function HighlightBox() {
    return (

        <div className={classes.wrapper}>
            <h3>You want to work <span className={'bigger bold'}>@HEYZEL</span>?</h3>
            <p>We're always looking for <span className={'bold'}>awesome people</span> to work with. If you
                enjoy being around people, apply now!</p>
            <Link to={"/jobs"}>
                <div><IoArrowForward size={35}/> <p><span className={'bigger bold'}>Apply now!</span>
                </p></div>
            </Link>
        </div>

    );
}

export default HighlightBox;