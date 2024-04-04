import {Turnstile} from '@marsidev/react-turnstile'
import {cfSiteKey} from "../utility/Vars.jsx";
import i18next from "i18next";
import {useContext, useState} from "react";
import ThemeContext from "../context/ThemeContext.jsx";
import {useTranslation} from "react-i18next";

export default function Test() {
    const {t} = useTranslation()
    const {mode} = useContext(ThemeContext)
    const [turnstileError, setTurnstileError] = useState('')
    const [turnstileToken, setTurnstileToken] = useState('');


    function handleSubmit(e) {
        e.preventDefault()
        // REQUEST
        console.log("request token")
        verifyWithTurnstile({data: "NO DATA"})
    }

    const verifyWithTurnstile = async (formData) => {
        const verificationUrl = 'https://api.heyzel.de/verification.php';
        try {
            const response = await fetch(verificationUrl, {
                method: 'POST',
                body: JSON.stringify({ token: cfSiteKey }),
                headers: {
                    'content-type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data.success) {
                submitFormData(formData);
            } else {
                setTurnstileError(data.error);
            }
        } catch (error) {
            setTurnstileError(error);
        }
    };

    function submitFormData(formData) {
        console.log("Submitted ", formData)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Turnstile
                    siteKey={"1x00000000000000000000AA"}
                    theme={mode}
                    onSuccess={() => setTurnstileError("OK")}
                    onExpire={() => setTurnstileError("EXPIRED")}
                    onError={(err) => setTurnstileError("Other", err)}
                    options={{
                        action: "handleToken",
                        language: i18next.resolvedLanguage,
                        size: "normal",
                        refreshExpired: "manual",
                        appearance: "always"
                    }}

                />
                <div>{turnstileError}</div>
                <button type={'submit'}>SUBMIT</button>
            </form>
        </>
    )
}