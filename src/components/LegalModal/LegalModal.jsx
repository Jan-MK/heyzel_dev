import classes from './LegalModal.module.scss'
import {legalArray} from "../../utility/Vars.jsx";


function LegalModal({showImprint}) {
    if (showImprint) {
        return <div className={classes.content}>
            {legalArray[0].content}
        </div>
    }
    // PRIVACY
    return <div className={classes.content}>
        {legalArray[1].content}
    </div>
    ;
}

export default LegalModal;