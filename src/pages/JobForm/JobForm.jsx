import classes from "./JobForm.module.scss"
import {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from 'zod'
import {IoChevronBackOutline, IoTrashOutline} from "react-icons/io5";
import Submitted from "./Submitted/Submitted.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Cookies from 'universal-cookie';
import {days, prepareDataHTML, shifts} from "../../utility/Utility.jsx";
import axios from "axios";
import Logo from "../../components/Logo/Logo.jsx";
import LegalModal from "../../components/LegalModal/LegalModal.jsx";
import {useModal} from "../../context/ModalContext.jsx";
import {available, unavailable} from "../../assets/employment.json"
import {maxWidthMobile, minWidthTablet} from "../../utility/Vars.jsx";
import {useWindowDimensions} from "../../context/WindowDimensionsContext.jsx";
import {Trans, useTranslation} from "react-i18next";
import Validation from "../../components/Validation/Validation.jsx";
import VerificationContext from "../../context/VerificationContext.jsx";
import {generateSeo} from "../../assets/metaInformation.jsx";
import countriesDE from '../../assets/lang/countries-de.json'
import countriesEN from '../../assets/lang/countries-en.json'


const currentEmploymentOptions = ["Schüler", "Student", "Arbeitnehmer", "Selbstständig", "Arbeitslos/Arbeitssuchend"]
const desiredEmploymentOptions = [...unavailable, ...available]
const otherEarnings = ['BAföG', 'Kindergeld', 'Waisenrente', 'Keine']
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const today = new Date();
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

function JobForm() {
    const {t, i18n} = useTranslation();
    const defaultValues = {
        desiredEmployment: "",
        confirmation: false,
        firstName: '',
        lastName: '',
        birthday: '',
        photo: undefined,
        nationality: "",
        confession: '',
        ssn: '',
        phone: '',
        mail: '',
        street: '',
        zip: '',
        city: '',
        currentEmployment: "",
        salary: '',
        entry: '',
        earnings: "",
        experience: '',
        availability: days.reduce((acc, day) => ({...acc, [day]: [false, false, false]}), {}),
        motivation: '',
    }


    // TODO: TabIndex for each section, prevent back from leaving this form
    const {openModal} = useModal()
    const {isVerified} = useContext(VerificationContext)
    const refArray = useRef([]);
    const formContainerRef = useRef(null);
    const [formData, setFormData] = useState("")
    const [currentStep, setCurrentStep] = useState(0);
    const [answered, setAnswered] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    const [resetting, setResetting] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [successful, setSuccessful] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const [visited, setVisited] = useState([0])
    const {width} = useWindowDimensions()
    const [mode, setMode] = useState({
        isSmartphone: width <= maxWidthMobile,
        isTablet: width >= minWidthTablet && width <= 1150,
        isDesktop: width > 1150
    })
    const [currentSeo, setCurrentSeo] = useState();


    useEffect(() => {
        const seoData = generateSeo('jobs', i18n.resolvedLanguage);
        if (seoData) {
            setCurrentSeo(seoData);
        }

    }, [i18n.language, i18n]);

    useEffect(() => {
        setMode(prev => ({
            ...prev,
            isSmartphone: width <= maxWidthMobile,
            isTablet: width >= minWidthTablet && width <= 1150,
            isDesktop: width > 1150
        }))
    }, [width]);

    const createSchema = () => {
        return z.object({
            /*
            Setting constraints of what is currently searched for:
            Goto assets/employment.json and manipulate the unavailable array according to the options in i18n.js files:
            path: resources[lang].translation.jobForm.desiredEmp.options.o[X]
            */
            desiredEmployment: string()
                .refine(val => val !== "", {message: t('jobForm.desiredEmp.err1')})
                .refine(val => !unavailable.map(entry => {
                    return t(`jobForm.desiredEmp.${entry}.val`)
                }).includes(val), {message: t('jobForm.desiredEmp.err2')}),
            confirmation: z.boolean().refine(val => val === true, {message: t('jobForm.conf.err')}),
            firstName: string().min(1, {message: t('jobForm.fn.err')}),
            lastName: string().min(1, {message: t('jobForm.ln.err')}),
            birthday: z.string()
                .refine(val => !isNaN(Date.parse(val)), {message: t('jobForm.birthday.err1')})
                .refine(val => new Date(val) <= eighteenYearsAgo, {message: t('jobForm.birthday.err2')}),
            photo: z.any()
                .optional()
                .refine((files) => !files || files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE), {
                    message: t('jobForm.photo.err1'),
                })
                .refine(
                    (files) => !files || files.length === 0 || (files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type)),
                    {message: t('jobForm.photo.err2')}
                ),

            nationality: string().refine(val => val !== defaultValues.nationality, t('jobForm.nationality.err')),
            confession: string().optional(),
            ssn: string().optional(),
            mail: z.string().min(1, {message: t('jobForm.mail.err1')}).email({message: t('jobForm.mail.err2')}),
            phone: string().min(1, {message: t('jobForm.phone.err')}),
            street: string().min(1, {message: t('jobForm.street.err')}),
            zip: string().min(1, {message: t('jobForm.zip.err')}),
            city: string().min(1, {message: t('jobForm.city.err')}),
            currentEmployment: string().refine(val => val !== defaultValues.currentEmployment, t('jobForm.currentEmp.err')),
            earnings: string().refine(val => val !== defaultValues.earnings, t('jobForm.earnings.err')),
            entry: z.string()
                .refine(val => !isNaN(Date.parse(val)), {message: t('jobForm.entry.err1')})
                .refine(val => new Date(val) > today, {message: t('jobForm.entry.err2')}),
            salary: z.string()
                .min(1, {message: t('jobForm.salary.err1')})
                .regex(/^-?\d+([.,]\d+)?$/, {message: t('jobForm.salary.err2')})
                .regex(/^-?\d+([.,]\d{1,2})?$/, {message: t('jobForm.salary.err3')}),
            experience: string().optional(), // TODO Is optional but has issues and needs to be filled out.
            availability: z.object({
                MO: z.array(z.boolean().optional()).optional(),
                TU: z.array(z.boolean().optional()).optional(),
                WE: z.array(z.boolean().optional()).optional(),
                TH: z.array(z.boolean().optional()).optional(),
                FR: z.array(z.boolean().optional()).optional(),
                SA: z.array(z.boolean().optional()).optional(),
                SU: z.array(z.boolean().optional()).optional(),
            }).refine(availability => {
                    return Object.values(availability).some(day => day.includes(true))
                }, {
                    message: t('jobForm.availability.err'),
                }
            ),
            motivation: string().optional(),
        })
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid},
        setValue,
        trigger,
        reset
    } = useForm({
        resolver: zodResolver(createSchema()),
        mode: 'all',
        defaultValues: defaultValues,
    });
    const cookies = new Cookies()

    let nationalityOptionsRendered = useMemo(() => Object.values(i18n.resolvedLanguage === 'de' ? countriesDE : countriesEN).map((option, idx) => {
        return <option key={idx} value={option}>{option}</option>
    }))

    function resetForm() {
        setResetting(true)
        cleanForm()
        watched = steps.map(step => {
            return step.fields.map(field => {
                return watch(field)
            })
        })
        handleGoTo(0)
        requestAnimationFrame(() => setResetting(false))
    }

    function cleanForm() {
        cookies.remove('heyzel_jobform')
        cookies.remove('heyzel_progress')
        setVisited([0])
        setCurrentStep(0);
        reset(defaultValues);
    }

    useEffect(() => {
        setResetting(true)
        const savedFormData = cookies.get('heyzel_jobform')
        const progress = cookies.get('heyzel_progress')
        if (savedFormData) {
            reset(savedFormData)
            if (progress) {
                setVisited(progress || [0])
                for (const progressedOnReload of progress) {
                    checkValidity(steps[progressedOnReload].fields)
                }
            }
        } else {
            resetForm();
        }
        requestAnimationFrame(() => setResetting(false))
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (visited.length > 0) {
            requestAnimationFrame(() => {
                handleGoTo(visited[visited.length - 1]);
            });
        }
    }, [visited]);

    const saveFormDataToCookie = () => {
        const formValues = watch(); // Get all current form values
        cookies.set('heyzel_jobform', formValues, {path: '/'});
    };

    const registerWithSave = (fieldName, options) => {
        return {
            ...register(fieldName, options),
            onBlur: (e) => {
                options?.onBlur?.(e);
                saveFormDataToCookie();
            },
        };
    };

    const fillAllAvailability = () => {
        days.forEach(day => {
            shifts.forEach((_, optionIndex) => {
                setValue(`availability.${day}[${optionIndex}]`, true);
            });
        });
    };

    const clearAllAvailability = () => {
        days.forEach(day => {
            shifts.forEach((_, optionIndex) => {
                setValue(`availability.${day}[${optionIndex}]`, false);
            });
        });
    };

    const checkValidity = async (fieldsToValidate) => {
        if (!fieldsToValidate || fieldsToValidate.length === 0) {
            return true;
        }
        return await trigger(fieldsToValidate);
    };

    const handleNextClick = async (event) => {
        event.preventDefault()
        const fieldsToValidate = steps[currentStep]?.fields;
        const result = await checkValidity(fieldsToValidate);

        if (result && currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);

            if (!visited.includes(currentStep + 1)) {
                setVisited(prev => {
                    cookies.set('heyzel_progress', [...prev, currentStep + 1])
                    return [...prev, currentStep + 1]
                })
            }
        }
    };

    const handleBackClick = (event) => {
        event.preventDefault()
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    function handleGoTo(idx, event) {
        event?.preventDefault()
        if (idx === currentStep || !visited.includes(idx)) return
        if (idx < currentStep) {
            for (let i = currentStep; i > idx; i--) {
                const prev = refArray.current[i]?.classList
                if (prev) {
                    if (currentStep === i) prev.remove(classes.center)
                    prev.remove(classes.left)
                    prev.add(classes.right)
                }
            }
            const newCurr = refArray.current[idx]?.classList
            if (newCurr) {
                newCurr.remove(classes.left)
                newCurr.add(classes.center)
            }
        } else {
            for (let i = currentStep; i < idx; i++) {
                const next = refArray.current[i]?.classList
                if (next) {
                    if (currentStep === i) next.remove(classes.center)
                    next.remove(classes.right)
                    next.add(classes.left)
                }
            }
            const newCurr = refArray.current[idx]?.classList
            if (newCurr) {
                newCurr.remove(classes.right)
                newCurr.add(classes.center)
            }
        }
        setCurrentStep(idx)
    }

    let steps = [
        {
            name: t('jobForm.steps.desktop.s1'),
            fields: ['confirmation', 'desiredEmployment'], // Required Fields
            html: <>
                <Logo width={"clamp(150px, 25vw, 500px)"}/>
                <div className={`reverseOrder`}>
                    <h1>{t('jobForm.intro.title')}</h1>
                    <p>{t('jobForm.intro.sub')}</p>
                </div>
                {/* Desired Employment */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-desiredEmployment">{t('jobForm.desiredEmp.label')}<span
                        className={classes.required}>*</span></label>
                    <select id="job-form-desiredEmployment" defaultValue={""}
                            tabIndex={currentStep === 0 ? 1 : -1} {...registerWithSave('desiredEmployment')}>
                        <option value={""} hidden={true}>{t('jobForm.general.selectPH')}</option>
                        {desiredEmploymentOptions.map(option => (
                            <option key={option}
                                    value={t(`jobForm.desiredEmp.${option}.val`)}>{t(`jobForm.desiredEmp.${option}.label`)}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.desiredEmployment?.message ? classes.error : classes.noError}`}>{errors.desiredEmployment?.message}</div>
                </div>
                {/* Confirmation */}
                <div className={`${classes.fieldWrapper}`}>
                    <div className={classes.confirmation}>

                        <input id='job-form-confirmation' className={classes.cbSmall}
                               tabIndex={currentStep === 0 ? 2 : -1}
                               type={"checkbox"} {...registerWithSave('confirmation')}/>
                        <label htmlFor="job-form-confirmation">
                            <Trans i18nKey="jobForm.conf.label">
                                Please confirm that you have read and agreed to our
                                <a onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    openModal(<LegalModal showImprint={false}/>)
                                }}>
                                    terms of privacy
                                </a>
                                on how we use the data.
                            </Trans>
                            <span className={classes.required}>*</span>
                        </label>
                    </div>
                    <div
                        className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>{errors.confirmation?.message}</div>
                </div>
                <Validation/>
            </>
        },
        {
            name: t('jobForm.steps.desktop.s2'),
            fields: ['firstName', 'lastName', 'birthday'], // Required Fields
            html: <>
                {/* First Name */}
                <div className={`${classes.fieldWrapper}`}>
                    <label htmlFor="job-form-firstName">{t('jobForm.fn.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-firstName" tabIndex={currentStep === 1 ? 1 : -1}
                           type={"text"} {...registerWithSave('firstName')}
                           placeholder={t('jobForm.fn.ph')}/>
                    <div
                        className={`${errors.firstName?.message ? classes.error : classes.noError}`}>{errors.firstName?.message || ' '}</div>
                </div>
                {/* Last Name */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-lastName">{t('jobForm.ln.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-lastName" tabIndex={currentStep === 1 ? 2 : -1}
                           type={"text"} {...registerWithSave('lastName')} placeholder={t('jobForm.ln.ph')}/>
                    <div
                        className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}</div>
                </div>
                {/* Birthday */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-birthday">{t('jobForm.birthday.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-birthday" tabIndex={currentStep === 1 ? 3 : -1}
                           type={"date"} {...registerWithSave('birthday')} />
                    <div
                        className={`${errors.birthday?.message ? classes.error : classes.noError}`}>{errors.birthday?.message}</div>
                </div>
                {/* Photo */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-photo">{t('jobForm.photo.label')}</label>
                    <input id="job-form-photo"
                           tabIndex={currentStep === 1 ? 4 : -1}
                           type="file"
                           accept="image/*"
                           {...registerWithSave('photo')}
                    />
                    <div
                        className={`${errors.photo?.message ? classes.error : classes.noError}`}>{errors.photo?.message}</div>
                </div>
            </>
        },
        {
            name: t('jobForm.steps.desktop.s3'),
            fields: ['nationality'], // Required Fields
            html: <>
                {/* Nationality */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-nationality">{t('jobForm.nationality.label')}<span
                        className={classes.required}>*</span></label>
                    <select id="job-form-nationality" defaultValue={""}
                            tabIndex={currentStep === 2 ? 1 : -1} {...registerWithSave('nationality')}>
                        <option value={""} hidden={true}>{t('jobForm.general.selectPH')}</option>
                        {nationalityOptionsRendered}
                    </select>
                    <div
                        className={`${errors.nationality?.message ? classes.error : classes.noError}`}>{errors.nationality?.message}</div>
                </div>
                {/* Confession */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-confession">{t('jobForm.confession.label')}</label>
                    <input id="job-form-confession" tabIndex={currentStep === 2 ? 2 : -1}
                           type={"text"} {...registerWithSave('confession')} placeholder={t('jobForm.confession.ph')}/>
                    <div
                        className={`${errors.confession?.message ? classes.error : classes.noError}`}>{errors.confession?.message}</div>
                </div>
                {/* Social Security Number (SSN) */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-ssn">{t('jobForm.ssn.label')}</label>
                    <input id="job-form-ssn" tabIndex={currentStep === 2 ? 3 : -1}
                           type={"text"} {...registerWithSave('ssn')} placeholder={t('jobForm.ssn.ph')}/>
                </div>
            </>
        },
        {
            name: t('jobForm.steps.desktop.s4'),
            fields: ['mail', 'phone', 'street', 'zip', 'city'], // Required fields
            html: <>
                {/* E-Mail */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-mail">{t('jobForm.mail.label')}<span className={classes.required}>*</span></label>
                    <input id="job-form-mail" tabIndex={currentStep === 3 ? 1 : -1}
                           type="email" {...registerWithSave('mail')} placeholder={t('jobForm.mail.ph')}/>
                    <div
                        className={`${errors.mail?.message ? classes.error : classes.noError}`}>{errors.mail?.message}</div>
                </div>
                {/* Phone */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-phone">{t('jobForm.phone.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-phone" tabIndex={currentStep === 3 ? 2 : -1}
                           type="tel" {...registerWithSave('phone')} placeholder={t('jobForm.phone.ph')}
                           autoComplete={"tel"}
                    />
                    <div
                        className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}</div>
                </div>
                {/* Street */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-street">{t('jobForm.street.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-street" tabIndex={currentStep === 3 ? 3 : -1}
                           type="text" {...registerWithSave('street')} placeholder={t('jobForm.street.ph')}/>
                    <div
                        className={`${errors.street?.message ? classes.error : classes.noError}`}>{errors.street?.message}</div>
                </div>
                {/* ZIP */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-zip">{t('jobForm.zip.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-zip" tabIndex={currentStep === 3 ? 4 : -1}
                           type="text" {...registerWithSave('zip')}
                           placeholder={t('jobForm.zip.ph')}/>
                    <div
                        className={`${errors.zip?.message ? classes.error : classes.noError}`}>{errors.zip?.message}</div>
                </div>
                {/* City */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-city">{t('jobForm.city.label')}<span className={classes.required}>*</span></label>
                    <input id="job-form-city" tabIndex={currentStep === 3 ? 5 : -1}
                           type="text" {...registerWithSave('city')} placeholder={t('jobForm.city.ph')}/>
                    <div
                        className={`${errors.city?.message ? classes.error : classes.noError}`}>{errors.city?.message}</div>
                </div>
            </>

        },
        {
            name: t('jobForm.steps.desktop.s5'),
            fields: ['currentEmployment', 'earnings', 'salary', 'entry'], // Required fields
            html: <>
                {/* Current Employment */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-currentEmployment">{t('jobForm.currentEmp.label')}<span
                        className={classes.required}>*</span></label>
                    <select id="job-form-currentEmployment" defaultValue={""}
                            tabIndex={currentStep === 4 ? 1 : -1} {...registerWithSave('currentEmployment')}>
                        <option value={""} hidden={true}>{t('jobForm.general.selectPH')}</option>
                        {currentEmploymentOptions.map((option, idx) => (
                            <option key={idx}
                                    value={t(`jobForm.currentEmp.options.o${idx + 1}.val`)}>{t(`jobForm.currentEmp.options.o${idx + 1}.label`)}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.currentEmployment?.message ? classes.error : classes.noError}`}>{errors.currentEmployment?.message}</div>
                </div>
                {/* Earnings */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-earnings">{t('jobForm.earnings.label')}<span
                        className={classes.required}>*</span></label>
                    <select id="job-form-earnings" defaultValue={""}
                            tabIndex={currentStep === 4 ? 2 : -1} {...registerWithSave('earnings')}>
                        <option value={""} hidden={true}>{t('jobForm.general.selectPH')}</option>
                        {otherEarnings.map((option, idx) => (
                            <option key={idx}
                                    value={t(`jobForm.earnings.options.o${idx + 1}.val`)}>{t(`jobForm.earnings.options.o${idx + 1}.label`)}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.earnings?.message ? classes.error : classes.noError}`}>{errors.earnings?.message}</div>
                </div>
                {/* Salary */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-salary">{t('jobForm.salary.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-salary" tabIndex={currentStep === 4 ? 3 : -1}
                           type={"tel"} {...registerWithSave('salary')} placeholder={t('jobForm.salary.ph')}/>
                    <div
                        className={`${errors.salary?.message ? classes.error : classes.noError}`}>{errors.salary?.message}</div>
                </div>
                {/* Entry Date */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-entry">{t('jobForm.entry.label')}<span
                        className={classes.required}>*</span></label>
                    <input id="job-form-entry" tabIndex={currentStep === 4 ? 4 : -1}
                           type={"date"} {...registerWithSave('entry')} />
                    <div
                        className={`${errors.entry?.message ? classes.error : classes.noError}`}>{errors.entry?.message}</div>
                </div>
                {/* Experience */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-experience">{t('jobForm.experience.label')}</label>
                    <textarea id="job-form-experience" tabIndex={currentStep === 4 ? 5 : -1}
                              rows={5} {...registerWithSave('experience')}
                              placeholder={t('jobForm.experience.ph')}/>
                    <div
                        className={`${errors.experience?.message ? classes.error : classes.noError}`}>{errors.experience?.message}</div>
                </div>
            </>
        },
        {
            name: t('jobForm.steps.desktop.s6'),
            fields: ['availability'],
            html: <>
                {/* Availability */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="availability">{t('jobForm.availability.label')}<span
                        className={classes.required}>*</span></label>
                    <p>{t("jobForm.availability.dscr")}</p>
                    <p>{t("jobForm.availability.ex")}</p>
                    <table className={classes.availabilityTable}>
                        <thead>
                        <tr>
                            <th>{t('jobForm.availability.start')}<br/>{t('jobForm.availability.shift')}</th>
                            {days.map((day, idx) => mode.isSmartphone
                                ? <th key={idx}>{t(`jobForm.availability.shifts.days.d${idx}`).substring(0, 3)}</th>
                                : <th key={idx}>{t(`jobForm.availability.shifts.days.d${idx}`)}</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {shifts.map((option, shiftIndex) => (
                            <tr key={shiftIndex}>
                                <td>{t(`jobForm.availability.shifts.s${shiftIndex}.label`)}<br/>{t(`jobForm.availability.shifts.s${shiftIndex}.time`)}
                                </td>
                                {days.map((day, dayIndex) => (
                                    <td key={`${day}-${shiftIndex}`}>
                                        <input autoFocus={false}
                                               tabIndex={currentStep === 5 ? (shiftIndex * days.length) + dayIndex : -1}
                                               type="checkbox"
                                               aria-label={`${t(`jobForm.availability.shifts.days.d${dayIndex}`)} - ${t(`jobForm.availability.shifts.s${shiftIndex}.label`)}`}
                                               {...registerWithSave(`availability.${day}[${shiftIndex}]`)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div
                    className={`${errors.availability?.message ? classes.error : classes.noError}`}>{errors.availability?.message}</div>
                <div className={classes.availabilityButtons}>{/*TODO: RESOLVE BUTTON HOVER PROBLEM @1500x1053px vp */}
                    <button tabIndex={currentStep === 5 ? (shifts.length * days.length) : -1} type="button"
                            onClick={fillAllAvailability}
                            className={"button-confirm"}>{t("jobForm.availability.btn.fillAll")}
                    </button>
                    <button tabIndex={currentStep === 5 ? (shifts.length * days.length) + 1 : -1} type="button"
                            onClick={clearAllAvailability}
                            className={"button-warning"}>{t("jobForm.availability.btn.clearAll")}
                    </button>
                </div>
            </>
        },
        {
            name: t('jobForm.steps.desktop.s7'),
            fields: [],
            html: <>
                {/* Motivation */}
                <div className={classes.fieldWrapper}>
                    <label htmlFor="job-form-motivation">{t("jobForm.motivation.label")}</label>
                    <textarea id="job-form-motivation" tabIndex={currentStep === 6 ? 1 : -1}
                              rows={5} {...registerWithSave('motivation')}
                              placeholder={t("jobForm.motivation.ph")}/>
                    <div
                        className={`${errors.motivation?.message ? classes.error : classes.noError}`}>{errors.motivation?.message}</div>
                </div>
            </>

        }
    ]

    let watched = steps.map(step => {
        return step.fields.map(field => {
            return watch(field)
        })
    })

    function requiredHaveContent() {
        function checkAtLeastOneCheckboxChecked(availability) {
            return Object.values(availability).some(dayCheckboxes => {
                // Ensure dayCheckboxes is actually an array before calling .some()
                return Array.isArray(dayCheckboxes) && dayCheckboxes.some(isChecked => isChecked);
            });
        }

        return watched[currentStep]
            .every(value => {
                // Check if the value is text (including handling a single checkbox as a boolean)
                const isNonEmptyText = typeof value === 'string' && value.trim() !== '' && value !== 'Please select...';
                const isCheckboxChecked = typeof value === 'boolean' && value;
                const isArrayWithCheckedBoxes = value && typeof value === 'object' && checkAtLeastOneCheckboxChecked(value);
                return isNonEmptyText || isCheckboxChecked || isArrayWithCheckedBoxes
            })
    }

    function currentHaveNoErrors() {
        let errorArray = Object.keys(errors);
        return steps[currentStep].fields.every(field => !errorArray.includes(field));
    }

    function checkPhoto() {
        return !Object.keys(errors).includes('photo')
    }

    function checkCurrentStep() {
        let firstStepOk = currentStep === 0 ? currentHaveNoErrors() : true;
        let photoOk = currentStep === 1 ? checkPhoto() : true;
        let isContent = requiredHaveContent();
        setButtonDisabled(!(isContent && photoOk && firstStepOk))
    }

    let watchedImage = watch('photo')

    useEffect(() => {
        if (watchedImage && watchedImage.length > 0) {
            checkCurrentStep()
            setSelectedFile(watchedImage[0]);
        }

    }, [watchedImage]);

    useEffect(() => {
        if (currentStep === steps.length - 1) {
            setButtonDisabled(true)
        } else {
            checkCurrentStep()
        }

    }, [currentStep, watched]);

    const navigationElements = steps.map((section, idx) => {
        function noErrorsCurrentStep() {
            let fields = steps[idx].fields;
            return fields.length === 0 || fields.every(field => !(field in errors))
        }

        let className = classes.open;
        if (currentStep === idx) {
            className = classes.current;
        } else if (currentStep > idx || visited.includes(idx)) {
            if (noErrorsCurrentStep() && (idx !== 0 || isVerified)) {
                className = classes.done;
            } else {
                className = classes.incomplete;
            }
        }

        return (
            <li
                className={className}
                key={idx}
                onClick={(e) => handleGoTo(idx, e)}
            >
                {mode.isDesktop && section.name}
                {mode.isTablet && `Step ${t('jobForm.steps.tablet')} ${idx + 1}`}
                {mode.isSmartphone && idx + 1}
            </li>
        );
    });

    function handleSave(formContent) {
        setSubmitted(true)
        const dataToSend = new FormData();
        let renderedFormData = prepareDataHTML(formContent);
        if (renderedFormData) {
            dataToSend.append('emailContent', renderedFormData);

            if (selectedFile) {
                dataToSend.append('applicationPhoto', selectedFile);
            }

            axios.post('https://api.heyzel.de/sendApplication.php', dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {

                    if (response.status === 202) {
                        console.log('Message sent but photo could not be attached');
                    } else {
                    }
                    setAnswered(true)
                    setSuccessful(true);
                })
                .catch(() => {
                    console.log('Could not send application, please send it manually.')
                    setFormData(formContent)
                    setAnswered(true)
                    setSuccessful(false);
                });
        } else {
            // In case rendering the data to html did not work, open the Submitted page.
            setFormData(formContent)
            setAnswered(true)
            setSuccessful(false);
        }
    }

    function handleReset(event) {
        event.preventDefault()
        resetForm();
    }

    return (
        <>
            {currentSeo}
            {resetting && <Loading text={"Preparing job form..."}/>}
            {!resetting && !submitted &&
                <form onSubmit={handleSubmit(handleSave)} className={`${classes.formContainer}`} ref={formContainerRef}>
                    <div className={classes.topControl}>
                        <a tabIndex={-1} href={"/"} target={'_self'}>
                            <IoChevronBackOutline/>
                            <p>{t('jobForm.general.backLabel')}</p>
                        </a>
                        <button tabIndex={-1} className={classes.borderlessBtn} onClick={handleReset}>
                            <IoTrashOutline
                                color={"#F44336FF"}/>{t('jobForm.general.resetLabel')}
                        </button>
                        <ul className={`${classes.navigationElements} ${classes.top}`}>
                            Steps {navigationElements}
                        </ul>
                    </div>
                    <div className={classes.sectionWrapper} id={"jfsw"}>
                        {steps.map((step, index) => {
                                let order = index < currentStep ? classes.left : index === currentStep ? classes.center : classes.right
                                order = index === currentStep ? classes.center : order
                                return <section key={index}
                                                className={`${classes.scrollable} ${order} ${index === 0 && classes.welcome}`}
                                                ref={(el) => (refArray.current[index] = el)}>
                                    <div className={classes.stepWrapper}>
                                        {step.html}
                                    </div>
                                </section>
                            }
                        )}
                    </div>
                    <div className={classes.bottomControl}>
                        <div className={classes.directNav}>
                            <ul className={classes.navigationElements}>
                                {navigationElements}
                            </ul>
                        </div>
                        <div className={classes.buttons}>
                            {currentStep !== 0 && <button tabIndex={991} onClick={handleBackClick}
                                                          className={`${classes.ctrlBtn} ${classes.enabled} secondary`}>{t('jobForm.general.btn.back')}
                            </button>}
                            {currentStep !== steps.length - 1 ?
                                <button disabled={buttonDisabled || (currentStep === 0 && !isVerified)} tabIndex={990}
                                        onClick={handleNextClick}
                                        className={`${classes.ctrlBtn}  ${(buttonDisabled || (currentStep === 0 && !isVerified)) ? 'button-disabled' : 'button-confirm'}`}>{t('jobForm.general.btn.next')}
                                </button> : <button disabled={!isValid || !isVerified} tabIndex={990} type={"submit"}
                                                    className={`${classes.ctrlBtn} ${isValid && isVerified ? 'button-confirm' : 'button-disabled'}`}>{t('jobForm.general.btn.sbm')}
                                </button>}
                        </div>
                    </div>
                </form>}
            {!resetting && submitted &&
                <Submitted show={submitted} answered={answered} successful={successful} formData={formData}
                           cleanForm={cleanForm}/>}
        </>
    );
}

export default JobForm;