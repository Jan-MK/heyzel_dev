import classes from "./Contact.module.scss"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useContext, useEffect, useState} from "react";
import VerticalTable from "../VerticalTable/VerticalTable.jsx";
import HighlightBox from "../HighlightBox/HighlightBox.jsx";
import {useModal} from "../../context/ModalContext.jsx";
import LegalModal from "../LegalModal/LegalModal.jsx";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {IoArrowForward} from "react-icons/io5";
import {cfSiteKey} from "../../utility/Vars.jsx";
import ThemeContext from "../../context/ThemeContext.jsx";
import {Turnstile} from "@marsidev/react-turnstile";
import i18next from "i18next";

function Contact() {
    const {t} = useTranslation();
    const {mode} = useContext(ThemeContext)
    const defaultValues = {
        firstName: '',
        lastName: '',
        mail: '',
        type: t('contact.form.type.ph'),
        subject: '',
        message: '',
        confirmation: false
    }
    const [typeIsOther, setTypeIsOther] = useState(false)
    const [turnstileToken, setTurnstileToken] = useState('');
    const [turnstileError, setTurnstileError] = useState('');
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
        trigger,
        reset
    } = useForm({
        resolver: zodResolver(createSchema(typeIsOther)),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    const {openModal} = useModal();

    function createSchema(typeIsOther) {
        return z.object({
            firstName: z.string().optional(),
            lastName: z.string().min(1, {message: t('contact.form.ln.err')}),
            mail: z.string().min(1, {message: t('contact.form.mail.err1')}).email(t('contact.form.mail.err2')),
            type: z.string().min(1, {message: t('contact.form.type.err')})
                .refine(val => val !== t('contact.form.type.ph'), {message: t('contact.form.type.err')}),
            subject: z.string().refine(val => !typeIsOther || (typeIsOther && val.length >= 1), {
                message: t('contact.form.sub.err'),
            }),
            message: z.string().min(1, {message: t('contact.form.msg.err')}),
            confirmation: z.boolean().refine(bool => bool === true, {message: t('contact.form.conf.err')}),
        });
    }

    const watchType = watch("type");

    // Use useEffect to react to changes in 'type' field
    useEffect(() => {
        setTypeIsOther(watchType === t('contact.form.type.options.o3.val'))
    }, [watchType, t]);

    const handleSave = async (formData) => {
        if (!turnstileToken) {
            setTurnstileError(t('cloudflare.promptVerify')); // Set error message
            return;
        }
        verifyWithTurnstile(formData);
    };

    const onSuccess = (token) => {
        setTurnstileToken(token);
        setTurnstileError('');
    };

    const onExpire = () => {
        setTurnstileError(t('errors.verificationExpired'));
    };

    const onError = (error) => {
        setTurnstileError(`${t('errors.verificationError')} : ${error}`);
    };

    const verifyWithTurnstile = async (formData) => {
        // Example endpoint, replace with your actual verification endpoint
        const verificationUrl = 'https://api.heyzel.de/verification.php';
        try {
            const response = await fetch(verificationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `cf-turnstile-response=${turnstileToken}`,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data.success) {
                submitFormData(formData);
            } else {
                setTurnstileError(t('cloudflare.errorFail'));
            }
        } catch (error) {
            setTurnstileError(t('cloudflare.errorRequest'));
        }
    };

    const submitFormData = (formData) => {
        if (Object.keys(errors).length !== 0) {
            reset(formData)
            trigger()
        } else {
            console.log("OK Submit")
        }
        // TODO !!! Create api endpoint for it
    }


    return (
        <div className={classes.splitview}>
            <div className={classes.contactInfo}>
                <HighlightBox>
                    <div className={classes.wrapper}>
                        <h3>
                            <Trans i18nKey="contact.highlight.title">
                                You want to work <span className="bigger bold">@HEYZEL</span>?
                            </Trans>
                        </h3>
                        <p>{t('contact.highlight.dscr')}</p>
                        <Link to={"/jobs"}>
                            <div><IoArrowForward size={35}/> <p><span className={'bigger bold'}>Apply now!</span>
                            </p></div>
                        </Link>
                    </div>
                </HighlightBox>
                <div className={classes.office}>
                    <VerticalTable contentSizeBig={true} heading={'OFFICE'} entries={
                        [{
                            title: t('contact.general.sub1'),
                            description: <><p>Böheimstr. 3</p>
                                <p>86153 Augsburg</p></>
                        }, {
                            title: t('contact.general.sub2'),
                            description: <a href={`mailto:kontakt@heyzel.de`}>{"kontakt@heyzel.de"}</a>
                        }, {
                            title: t('contact.general.sub3'),
                            description: "+49 821 450448-0"
                        }]
                    }/>
                </div>
            </div>
            <form className={classes.formContainer} onSubmit={handleSubmit(handleSave)}>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>{t('contact.form.fn.label')}:</p>
                        <input type={'text'} {...register('firstName')} placeholder={t('contact.form.fn.ph')}/>
                    </div>
                    <div>
                        <p>{t('contact.form.ln.label')}<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('lastName')} placeholder={t('contact.form.ln.ph')}/>
                        <div
                            className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}
                        </div>
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>{t('contact.form.mail.label')}<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('mail')} placeholder={t('contact.form.mail.ph')}/>
                        <div
                            className={`${errors.mail?.message ? classes.error : classes.noError}`}>{errors.mail?.message}
                        </div>
                    </div>
                    <div>
                        <p>{t('contact.form.phone.label')}:</p>
                        <input type={'tel'} {...register('phone')} placeholder={t('contact.form.phone.ph')}/>
                        <div
                            className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}
                        </div>
                    </div>
                </div>
                <div className={`${classes.rowWrapper}`}>
                    <div>
                        <p>{t('contact.form.type.label')}<span className={classes.required}>*</span>: </p>
                        <select defaultValue={t('contact.form.type.ph')}
                                {...register('type')}>
                            <option value={t('contact.form.type.ph')}
                                    hidden={true}>{t('contact.form.type.ph')}</option>
                            <option
                                value={t('contact.form.type.options.o1.val')}>{t('contact.form.type.options.o1.label')}</option>
                            <option
                                value={t('contact.form.type.options.o2.val')}>{t('contact.form.type.options.o2.label')}</option>
                            <option
                                value={t('contact.form.type.options.o3.val')}>{t('contact.form.type.options.o3.label')}</option>
                        </select>
                        <div
                            className={`${errors.type?.message ? classes.error : classes.noError}`}>{errors.type?.message}
                        </div>
                    </div>
                    {typeIsOther && <div>
                        <p>{t('contact.form.sub.label')}<span className={classes.required}>*</span>:</p>
                        <input type={'text'} max={50} {...register('subject')} placeholder={t('contact.form.sub.ph')}/>
                        <div className={`${errors.subject?.message ? classes.error : classes.noError}`}>
                            {errors.subject?.message}
                        </div>
                    </div>}
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={classes.fullWidth}>
                        <p>{t('contact.form.msg.label')}<span className={classes.required}>*</span>:</p>
                        <textarea rows={5} maxLength={1000} {...register('message')}
                                  placeholder={t('contact.form.msg.ph')}/>
                    </div>
                    <div className={`${errors.message?.message ? classes.error : classes.noError}`}>
                        {errors.message?.message}
                    </div>
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={`${classes.confirmation}`}>
                        <input id={'confirm'} type={"checkbox"} {...register('confirmation')}/>
                        <label>
                            <Trans i18nKey="contact.form.conf.label">
                                Please confirm that you have read and agreed to our
                                <a onClick={() => openModal(<LegalModal showImprint={false}/>)}>
                                    terms of privacy
                                </a>
                                on how we use the data.
                            </Trans>
                            <span className={classes.required}>*</span>
                        </label>
                    </div>
                    <div className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>
                        {errors.confirmation?.message}
                    </div>
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <Turnstile
                        sitekey={cfSiteKey}
                        theme={mode}
                        onSuccess={onSuccess}
                        onExpire={onExpire}
                        onError={onError}
                        options={{
                            language: i18next.resolvedLanguage,
                            size: "normal",
                            refreshExpired: "manual",
                            appearance: "always"
                        }}

                    />
                    <div className={`${turnstileError ? classes.error : classes.noError}`}>
                        {turnstileError}
                    </div>
                </div>
                <button disabled={!isValid} type={"submit"} className={`${classes.submit}`}>{t('contact.form.btn')}</button>
            </form>
        </div>
    );
}

export default Contact;