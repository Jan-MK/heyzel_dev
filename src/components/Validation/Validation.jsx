import {cfSiteKey} from "../../utility/Vars.jsx";
import i18next from "i18next";
import {lazy, Suspense, useContext, useState} from "react";
import {useTranslation} from "react-i18next";
const Turnstile = lazy(() => import("react-turnstile"));

import {useCookie} from "../../context/CookieContext.jsx";
import ThemeContext from "../../context/ThemeContext.jsx";
import VerificationContext from "../../context/VerificationContext.jsx";
import Loading from "../Loading/Loading.jsx";

export default function Validation() {
    const {t} = useTranslation()

    const {mode} = useContext(ThemeContext)
    const {setIsVerified} = useContext(VerificationContext)
    const {isAllowed, setAllow} = useCookie()

    const [turnstileError, setTurnstileError] = useState('')

    return (
        <>
            <div className={`verificationBox ${!isAllowed && 'outlined'}`}>
                {!isAllowed &&
                    <>
                        <div className={'cookieInForm'}>
                            <p style={{fontSize: "20px", fontWeight: "700"}}>{t('cloudflare.cookies.title')}</p>
                            <p>{t('cloudflare.cookies.dscr')}</p>
                        </div>
                        <button className={'btnCookieConsent button-confirm'} onClick={(e) => {
                            e.preventDefault()
                            setAllow(true)
                        }}>
                            {t('cloudflare.cookies.approval')}
                        </button>
                    </>
                }
                {isAllowed && <>
                    <Suspense fallback={<Loading text={t('cloudflare.suspense')}/>}>
                        <Turnstile
                            sitekey={cfSiteKey}
                            fixedSize={true}
                            size={"normal"}
                            theme={mode}
                            language={i18next.resolvedLanguage}
                            onVerify={(token) => {
                                fetch('https://api.heyzel.de/verification.php', {
                                    method: 'POST',
                                    body: JSON.stringify({token: token}),
                                    headers: {
                                        'content-type': 'application/json'
                                    }
                                })
                                    .then(response => {
                                        const statusCode = response.status;
                                        return response.json().then(data => ({data, statusCode}));
                                    })
                                    .then(({data, statusCode}) => {
                                        if (data.success) {
                                            setIsVerified(true);
                                            setTurnstileError("");
                                        } else {
                                            let errorMessageKey = "";
                                            switch (statusCode) {
                                                case 401: // Unauthorized or verification failed
                                                    errorMessageKey = "cloudflare.errors.verificationFailed";
                                                    break;
                                                case 400: // Bad Request, such as no verification token provided
                                                    errorMessageKey = "cloudflare.errors.completeVerification";
                                                    break;
                                                case 405: // Method not allowed
                                                    errorMessageKey = "cloudflare.errors.requestProblem";
                                                    break;
                                                case 500: // Internal Server Error
                                                default:
                                                    errorMessageKey = "cloudflare.errors.verificationError";
                                                    break;
                                            }
                                            setTurnstileError(t(errorMessageKey));
                                            console.log(t(errorMessageKey)); // Log the localized error message
                                            setIsVerified(false);
                                        }
                                    })
                                    .catch(error => {
                                        console.log("Info: ", error);
                                        setTurnstileError(t("cloudflare.errors.requestProblem"));
                                        setIsVerified(false);
                                    });
                            }}
                        />
                        <div className={`${turnstileError ? 'error' : 'noError'}`}>
                            {turnstileError}
                        </div>
                    </Suspense>
                </>}
            </div>
        </>
    )
}