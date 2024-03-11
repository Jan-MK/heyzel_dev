import classes from "./Submitted.module.scss"
import {useEffect, useState} from "react";
import LoadingFull from "../LoadingFull/LoadingFull.jsx";
import {prepareData} from "../../../utility/Utility.jsx";
import {Link} from "react-router-dom";

function Submitted({show, answered, successful, formData, cleanForm}) {
    const [content, setContent] = useState(<LoadingFull text={"Sending application..."}/>)
    const [currentClass, setCurrentClass] = useState("")



    useEffect(() => {
        const mailToLink = `mailto:jan.kraemer@selfmail.eu`;
        const generateError = () => {
            setContent(<>
                <h2>An error occurred!</h2>
                <p>Please write an E-Mail to</p>
                <a href={mailToLink}>bewerbung@heyzel.de</a>
                <Link to={"/"}>Go to main page.</Link>
            </>)
            setCurrentClass(classes.error)
        }

        if (answered) {
            if (successful) {
                setContent(<>
                    <h2>Success!</h2>
                    <p>Your application has been sent. We will get back to you asap!</p>
                    <Link to={"/"}>Go to main page.</Link>
                </>)
                setCurrentClass(classes.success)
            } else {
                // Was unsuccessful, check if Data
                if (formData) {
                    const content = prepareData(formData)
                    if (content) {
                        const mailSubject = encodeURIComponent(`Bewerbung ${formData.firstName} ${formData.lastName}`)
                        const mailBody = encodeURIComponent(content);
                        const mailToWithData = `${mailToLink}?subject=${mailSubject}&body=${mailBody}`;
                        setContent(<>
                            <h2>Oops, something went wrong...</h2>
                            <p>No worries, you can send it via your local e-mail client.</p>
                            <a href={mailToWithData}>Send my application via mail.</a>
                            <Link to={"/"}>Go to main page.</Link>
                        </>)
                        setCurrentClass(classes.warning)
                    } else {
                        generateError()
                    }
                } else {
                    generateError()
                }
            }
        }
        return () => {
            if (cleanForm) {
                cleanForm();
            }
        };
    }, [answered, successful])


    return (
        show && <div className={`${classes.fullscreen} ${currentClass} ${show ? classes.show : classes.hide}`}>
            <div className={classes.feedbackContainer}>
                {content}
            </div>
        </div>
)
    ;
}

export default Submitted;