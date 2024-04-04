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
        verifyWithTurnstile()
    }

    const verifyWithTurnstile = async () => {
        const verificationUrl = 'https://api.heyzel.de/verification.php';
        try {
            const response = await fetch(verificationUrl, {
                method: 'POST',
                body: JSON.stringify({ token: cfSiteKey }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log(response)
            //if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data.success) {
                submitFormData();
            } else {
                console.log(data)
//                setTurnstileError(data.error);
            }
        } catch (error) {
            console.log(error)
//            setTurnstileError(error);
        }
    };

    function submitFormData() {
        console.log("Submitted ")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Turnstile
                    siteKey={cfSiteKey}
                    theme={mode}
                    onSuccess={() => setTurnstileError("OK")}
                    onExpire={() => setTurnstileError("EXPIRED")}
                    onError={() => setTurnstileError("Other")}
                    options={{
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