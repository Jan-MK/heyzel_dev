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
import Validation from "../Validation/Validation.jsx";
import VerificationContext from "../../context/VerificationContext.jsx";
import {prepareContactHtml, prepareDataHTML} from "../../utility/Utility.jsx";
import axios from "axios";
import Loading from "../Loading/Loading.jsx";
import Submitted from "./Submitted/Submitted.jsx";
import {useGSAP} from "@gsap/react";

function Contact() {
    const {t} = useTranslation();
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
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid, isSubmitting, isSubmitted},
    } = useForm({
        resolver: zodResolver(createSchema(typeIsOther)),
        mode: 'onChange',
        defaultValues: defaultValues,
    });
    const {openModal} = useModal();
    const {isVerified} = useContext(VerificationContext)
    const [ isAnswered, setIsAnswered ] = useState(false)
    const [ isSubmitSuccessful, setIsSubmitSuccessful ] = useState(false)
    const [ sendingError, setSendingError ] = useState(false)
    const [render, setRender] = useState(false)

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




    function handleSave(formContent) {
        const dataToSend = new FormData();

        setTimeout(() => {
            try {
            let renderedFormData = prepareContactHtml(formContent);
                if (renderedFormData) {

                    dataToSend.append('emailContent', renderedFormData);

                    axios.post('https://api.heyzel.de/sendContact.php', dataToSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then(response => {
                            if (response.status === 500) throw new Error();
                            setIsAnswered(true)
                            setIsSubmitSuccessful(true);
                        })
                        .catch(() => {
                            console.log('Could not send application, please send it manually.')
                            setIsAnswered(true)
                            setIsSubmitSuccessful(false);
                        });
                } else {
                    setIsAnswered(true);
                    setIsSubmitSuccessful(false);
                }
            } catch (e) {
                setIsAnswered(true);
                setIsSubmitSuccessful(false);
            }
        }, 5000)
    }


    return (
        <div className={classes.splitview}>
            <div className={classes.contactInfo}>
                <HighlightBox>
                    <div className={classes.wrapper}>
                        <h2>
                            <Trans i18nKey="contact.highlight.title">
                                You want to work <span className="bigger bold">@HEYZEL</span>?
                            </Trans>
                        </h2>
                        <p>{t('contact.highlight.dscr')}</p>
                        <Link to={"/jobs"}>
                            <div><IoArrowForward size={35}/> <p><span className={'bigger bold'}>{t('contact.highlight.btn')}</span>
                            </p></div>
                        </Link>
                    </div>
                </HighlightBox>
                <div className={classes.office}>
                    <VerticalTable contentSizeBig={true} heading={'OFFICE'} hierarchy={2} entries={
                        [{
                            title: t('contact.general.sub1'),
                            description: <><p>HEYZEL COFFEE GmbH</p>
                                <p>Böheimstr. 3</p>
                                <p>86153 Augsburg</p></>
                        }, {
                            title: t('contact.general.sub2'),
                            description: <a href={`mailto:info@heyzel.de`}>{"info@heyzel.de"}</a>
                        }, {
                            title: t('contact.general.sub3'),
                            description: "+49 821 450448-0"
                        }]
                    }/>
                </div>
            </div>
            <form className={classes.formContainer} id={"formWrapper"} onSubmit={handleSubmit(handleSave)}>
                <h2>{t('contact.form.title')}</h2>
                <div className={classes.rowWrapper}>
                    <div>
                        <label htmlFor={'cFirstName'}>{t('contact.form.fn.label')}:</label>
                        <input id={'cFirstName'} type={'text'} {...register('firstName')} placeholder={t('contact.form.fn.ph')}/>
                    </div>
                    <div>
                        <label htmlFor={'cLastName'}>{t('contact.form.ln.label')}<span className={classes.required}>*</span>:</label>
                        <input id={'cLastName'} type={'text'} {...register('lastName')} placeholder={t('contact.form.ln.ph')}/>
                        <div
                            className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}
                        </div>
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div>
                        <label htmlFor={'mail'}>{t('contact.form.mail.label')}<span className={classes.required}>*</span>:</label>
                        <input id={'mail'} type={'text'} {...register('mail')} placeholder={t('contact.form.mail.ph')}/>
                        <div
                            className={`${errors.mail?.message ? classes.error : classes.noError}`}>{errors.mail?.message}
                        </div>
                    </div>
                    <div>
                        <label htmlFor={'phone'}>{t('contact.form.phone.label')}:</label>
                        <input id={'phone'} type={'tel'} {...register('phone')} placeholder={t('contact.form.phone.ph')}  autoComplete={"tel"}/>
                        <div
                            className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}
                        </div>
                    </div>
                </div>
                <div className={`${classes.rowWrapper}`}>
                    <div>
                        <label htmlFor={'type'}>{t('contact.form.type.label')}<span className={classes.required}>*</span>: </label>
                        <select id={'type'} defaultValue={t('contact.form.type.ph')}
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
                        <label htmlFor={'subject'}>{t('contact.form.sub.label')}<span className={classes.required}>*</span>:</label>
                        <input type={'text'} id={'subject'} max={50} {...register('subject')} placeholder={t('contact.form.sub.ph')}/>
                        <div className={`${errors.subject?.message ? classes.error : classes.noError}`}>
                            {errors.subject?.message}
                        </div>
                    </div>}
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={classes.fullWidth}>
                        <label htmlFor={'message'}>{t('contact.form.msg.label')}<span className={classes.required}>*</span>:</label>
                        <textarea id={'message'} rows={5} maxLength={1000} {...register('message')}
                                  placeholder={t('contact.form.msg.ph')}/>
                    </div>
                    <div className={`${errors.message?.message ? classes.error : classes.noError}`}>
                        {errors.message?.message}
                    </div>
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={`${classes.confirmation}`}>
                        <input id={'confirm'} type={"checkbox"} {...register('confirmation')}/>
                        <label htmlFor={'confirm'}>
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
                    <Validation />
                </div>
                <button disabled={!isValid || !isVerified} type={"submit"} className={`${classes.submit} primary`}>{t('contact.form.btn')}</button>
                {(isSubmitting || isSubmitted) && <Loading text={t('contact.states.loading')} divOverlay={true}/>}
                {isAnswered && sendingError && <Submitted success={false} heading={t('contact.states.error')} text={t('contact.states.errorDsc')} divOverlay={true}/>}
                {isAnswered && isSubmitSuccessful && <Submitted success={true} heading={t('contact.states.success')} text={t('contact.states.successDsc')} divOverlay={true}/>}
            </form>

        </div>
    );
}

export default Contact;