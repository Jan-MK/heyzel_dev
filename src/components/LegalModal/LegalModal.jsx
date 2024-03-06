import {legalArray} from "../../utility/Utility.jsx";


function LegalModal({showImprint}) {
    if (showImprint) {
        return <div>
            {legalArray[0].content}
        </div>
    }
    // PRIVACY
    return <div>
        {legalArray[1].content}
    </div>
    ;
}

export default LegalModal;