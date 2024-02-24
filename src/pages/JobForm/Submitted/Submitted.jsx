import classes from "./Submitted.module.scss"
import {useEffect, useState} from "react";
import {PuffLoader} from "react-spinners";
import Reset from "../Reset/Reset.jsx";
import {prepareData} from "../../../utility/Utility.jsx";
import {Link} from "react-router-dom";

function Submitted({show, answered, successful, formData}) {
    const [content, setContent] = useState(<Reset text={"Sending application..."}/>)
    useEffect(() => {
        if (answered) {
            if (successful) {
                setContent(<>
                    <h2>Success!</h2>
                    <p>Your application has been sent. We will get back to you asap!</p>
                    <Link to={"/"}>Go back.</Link>
                </>)
            } else {
                const content = prepareData(formData)
                const mailSubject = encodeURIComponent(`Bewerbung ${formData.firstName} ${formData.lastName}`)
                const mailBody = encodeURIComponent(content);
                const mailtoLink = `mailto:jan.kraemer@selfmail.eu?subject=${mailSubject}&body=${mailBody}`;
                setContent(<>
                    <h2>Something went wrong...</h2>
                    <p>No worries, you can send it via your local e-mail client.</p>
                    <a href={mailtoLink}>Send my application via mail.</a>
                </>)
            }
        }
    }, [answered, successful])

    return (
        <div className={`${classes.fullscreen} ${show ? classes.show : classes.hide}`}>
            {content}
        </div>
    );
}

export default Submitted;