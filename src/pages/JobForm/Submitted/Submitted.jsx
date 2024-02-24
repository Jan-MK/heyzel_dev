import classes from "./Submitted.module.scss"
import {useEffect, useState} from "react";
import {PuffLoader} from "react-spinners";
import Reset from "../Reset/Reset.jsx";
import {prepareData} from "../../../utility/Utility.jsx";

function Submitted({show, successful, formData}) {
    const [content, setContent] = useState(<Reset/>)
    useEffect(() => {
        const subject = encodeURIComponent("Form Submission");
        const content = prepareData(formData)
        const mailSubject = encodeURIComponent(`Bewerbung ${formData.firstName} ${formData.lastName}`)
        const mailBody = encodeURIComponent(content);
        const mailtoLink = `mailto:jan.kraemer@selfmail.eu?subject=${mailSubject}&body=${mailBody}`;

        setContent(<>
            <h2>Something went wrong...</h2>
            <p>No worries, you can send it via your local e-mail client.</p>
            <a href={mailtoLink}>Send my application via mail.</a>
        </>)
    }, [successful])

    return (
        <div className={`${classes.fullscreen} ${show ? classes.show : classes.hide}`}>
            {content}
        </div>
    );
}

export default Submitted;