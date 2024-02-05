import classes from "./Submitted.module.scss"
import {useEffect, useState} from "react";
import {PuffLoader} from "react-spinners";
import Reset from "../Reset/Reset.jsx";
import {prepareData} from "../../../utility/Utility.jsx";

function Submitted({ show, successful, formData}) {
    const [content, setContent] = useState(<Reset />)
    useEffect(() => {
        const subject = encodeURIComponent("Form Submission");
        console.log(formData)
        const content = prepareData(formData)
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
        );
        console.log(content)

            setContent(<>
                <div>
                    <h2>Something went wrong...</h2>
                    <p>No worries, you can send it via your local e-mail client.</p>
                    <a >Send my application via mail.</a>
                </div>
            </>)
    }, [successful])

    return (
        <div className={`${classes.fullscreen} ${show ? classes.show : classes.hide}`}>
            {content}
        </div>
    );
}

export default Submitted;