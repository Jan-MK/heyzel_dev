import classes from "./Submitted.module.scss"
import {useEffect, useState} from "react";
import Loading from "../../../components/Loading/Loading.jsx";
import {prepareData} from "../../../utility/Utility.jsx";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Submitted({show, answered, successful, formData, cleanForm}) {
    const {t} = useTranslation()
    const [content, setContent] = useState(<Loading text={t("jobForm.submitted.status.sending")}/>)
    const [currentClass, setCurrentClass] = useState("")

// {t("jobForm.submitted.")}

    useEffect(() => {
        const mailToLink = `mailto:bewerbung@heyzel.de`;
        const generateError = () => {
            setContent(<>
                <h2>{t("jobForm.submitted.error.t1")}</h2>
                <p>{t("jobForm.submitted.error.t2")}</p>
                <a href={mailToLink}>bewerbung@heyzel.de</a>
                <p>{t("jobForm.submitted.error.t3")}</p>
                <Link to={"/"}>{t("jobForm.submitted.status.goTo")}</Link>
            </>)
            setCurrentClass(classes.error)
        }

        if (answered) {
            if (successful) {
                setContent(<>
                    <h2>{t("jobForm.submitted.success.t1")}</h2>
                    <p>{t("jobForm.submitted.success.t2")}</p>
                    <p>{t("jobForm.submitted.success.t3")}</p>
                    <p>{t("jobForm.submitted.success.t4")}</p>
                    <Link to={"/"}>{t("jobForm.submitted.status.goTo")}</Link>
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
                            <h2>{t("jobForm.submitted.warning.t1")}</h2>
                            <p>{t("jobForm.submitted.warning.t2")}</p>
                            <a href={mailToWithData}>{t("jobForm.submitted.warning.t3")}</a>
                            <p>{t("jobForm.submitted.warning.t4")}</p>
                            <Link to={"/"}>{t("jobForm.submitted.status.goTo")}</Link>
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