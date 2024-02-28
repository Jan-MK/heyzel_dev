import classes from "./JobForm.module.scss"
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from 'zod'
import {IoChevronBackOutline, IoTrashOutline} from "react-icons/io5";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.jsx";
import Submitted from "./Submitted/Submitted.jsx";
import Reset from "./Reset/Reset.jsx";
import Cookies from 'universal-cookie';
import {days, prepareData, prepareDataHTML, shifts} from "../../utility/Utility.jsx";
import axios from "axios";
import Logo from "../../components/Logo/Logo.jsx";

const defaultValues = {
    confirmation: false,
    firstName: '',
    lastName: '',
    birthday: '',
    photo: {},
    marital: '',
    nationality: '',
    confession: '',
    ssn: '',
    phone: '',
    mail: '',
    street: '',
    zip: '',
    city: '', // TILL HERE OK
    currentEmployment: "Please select...",
    desiredEmployment: "Please select...",
    salary: '',
    entry: '',
    earnings: 'Please select...',
    experience: '',
    availability: days.reduce((acc, day) => ({...acc, [day]: [false, false, false]}), {}),
    motivation: '',
}
const currentEmploymentOptions = ["Schüler", "Student", "Arbeitnehmer", "Selbstständig", "Arbeitslos/Arbeitssuchend"]
const desiredEmploymentOptions = ["Vollzeit", "Teilzeit", "Werksstudent", "Geringfügig (520 Euro-Basis)"]
const otherEarnings = ['BAföG', 'Kindergeld', 'Waisenrente', 'Keine']
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const today = new Date();
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const schema = z.object({
    confirmation: z.boolean().refine(val => val === true, {
        message: "You must accept the privacy terms to proceed.",
    }),
    firstName: string().min(1, {message: 'First name is required.'}),
    lastName: string().min(1, {message: 'Last name is required.'}),
    birthday: z.string()
        .refine(val => !isNaN(Date.parse(val)), {message: 'Birthday must be a valid date.'})
        .refine(val => new Date(val) <= eighteenYearsAgo, {message: 'You must be at least 18 years old.'}),
    photo: z.any()
        // First, check if a file has been provided.
        .refine((files) => files instanceof FileList && files.length > 0, `Please insert a photo`)
        // Next, check the file size, but only if there is a file.
        .refine((files) => files[0] && files[0].size <= MAX_FILE_SIZE, `Maximum image size is 5MB.`)
        // Finally, check the file type, again only if there is a file.
        .refine(
            (files) => files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type),
            "Only .jpg, .jpeg, .png, and .webp formats are supported."
        ),
    marital: string().min(1, {message: 'Marital status is required'}),
    nationality: string().min(1, {message: 'Nationality is required.'}),
    confession: string().min(1, {message: 'Confession is required'}),
    ssn: string().min(1, {message: 'Social security number is required'}),
    mail: string().email(),
    phone: string().min(1, {message: 'Phone number is required.'}),
    street: string().min(1, {message: 'Street is required.'}),
    zip: string().min(1, {message: 'Zip code is required.'}),
    city: string().min(1, {message: 'City is required.'}),
    currentEmployment: string().refine(val => val !== defaultValues.currentEmployment, 'Selection required'),
    desiredEmployment: string().refine(val => val !== defaultValues.desiredEmployment, 'Selection required'),
    earnings: string().refine(val => val !== defaultValues.earnings, 'Selection required'),
    entry: z.string()
        .refine(val => !isNaN(Date.parse(val)), {message: 'Entry must be a valid date.'})
        .refine(val => new Date(val) > today, {message: 'Entry date must be in the future.'}),
    salary: z.string()
        .transform(val => parseFloat(val)) // Transform the string to a number for validation.
        .refine(val => !isNaN(val), {message: 'Salary must be a number.'}),
    experience: string().optional(), // TODO Is optional but has issues and needs to be filled out.
    availability: z.object({
        Montag: z.array(z.boolean().optional()).optional(),
        Dienstag: z.array(z.boolean().optional()).optional(),
        Mittwoch: z.array(z.boolean().optional()).optional(),
        Donnerstag: z.array(z.boolean().optional()).optional(),
        Freitag: z.array(z.boolean().optional()).optional(),
        Samstag: z.array(z.boolean().optional()).optional(),
        Sonntag: z.array(z.boolean().optional()).optional(),
    }).refine(availability =>
            Object.values(availability).some(day => day.includes(true)),
        {
            message: "You must be available for at least one shift on any day.",
        }
    ),
    motivation: string().optional(),
})


function JobForm(props) {
    // TODO: TabIndex for each section, prevent back from leaving this form
    const refArray = useRef([]);
    const [formData, setFormData] = useState("")
    const [currentStep, setCurrentStep] = useState(0);
    const [answered, setAnswered] = useState(false)
    const [submitted, setSubmitted] = useState(false);
    const [resetting, setResetting] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [successful, setSuccessful] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null)
    const [visited, setVisited] = useState([0])
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        trigger,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: defaultValues,
    });
    const cookies = new Cookies()

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
        cookies.remove('jobform')
        cookies.remove('progress')
        setVisited([0])
        setCurrentStep(0);
        reset(defaultValues);
    }

    useEffect(() => {
        setResetting(true)
        const savedFormData = cookies.get('jobform')
        const progress = cookies.get('progress')
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
        //prefill(5)
    }, []);

    useEffect(() => {
        if (visited.length > 0) {
            // Ensure component layout has stabilized
            requestAnimationFrame(() => {
                handleGoTo(visited[visited.length - 1]);
            });
        }
    }, [visited]);

    const saveFormDataToCookie = () => {
        const formValues = watch(); // Get all current form values
        cookies.set('jobform', formValues, {path: '/'});
    };

    const registerWithSave = (fieldName, options) => {
        return {
            ...register(fieldName, options),
            onBlur: (e) => {
                // Original onBlur functionality, if any
                options?.onBlur?.(e);
                // Save form data whenever any field is blurred
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
            console.error("No fields provided for validation");
            return false;
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
                    cookies.set('progress', [...prev, currentStep + 1])
                    return [...prev, currentStep + 1]
                })
            }
        }
    };

    const handleBackClick = (event) => {
        event.preventDefault()
        if (currentStep > 0) {
            /*const previous = refArray.current[currentStep - 1] TODO NEEDED?
            const current = refArray.current[currentStep]

            current.classList.remove(classes.center)
            current.classList.add(classes.right)
            previous.classList.remove(classes.left)
            previous.classList.add(classes.center)*/
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
            name: "Privacy confirmation",
            fields: ['confirmation'], // Required Fields
            html: <>
                <Logo width={"min(25vw, 25vh)"}/>
                <div className={`reverseOrder ${classes.fieldWrapper}`}>
                    <h2>Job application form</h2>
                    <p>Welcome to our</p>
                </div>
                <div className={`${classes.confirmation} ${classes.fieldWrapper}`}>
                    <input className={classes.cbSmall} tabIndex={currentStep === 0 ? 1 : -1}
                           type={"checkbox"} {...registerWithSave('confirmation')}/>
                    <p>To proceed with the application process confirm that you have read and agreed to our <a
                        href={"#"} target={'_blank'} rel="noreferrer">terms
                        of privacy</a> on how we use the data.<span className={classes.required}>*</span></p>
                </div>
                <div
                    className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>{errors.confirmation?.message}</div>
            </>
        },
        {
            name: "Personal information I",
            fields: ['firstName', 'lastName', 'birthday', 'photo'], // Required Fields
            html: <>
                <div className={`${classes.fieldWrapper}`}>
                    <p>First name<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 1 ? 1 : -1} type={"text"} {...registerWithSave('firstName')}
                           placeholder={"First name"}/>
                    <div
                        className={`${errors.firstName?.message ? classes.error : classes.noError}`}>{errors.firstName?.message || ' '}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Last Name<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 1 ? 2 : -1}
                           type={"text"} {...registerWithSave('lastName')} placeholder={"Last name"}/>
                    <div
                        className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Birthday<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 1 ? 3 : -1}
                           type={"date"} {...registerWithSave('birthday')} />
                    <div
                        className={`${errors.birthday?.message ? classes.error : classes.noError}`}>{errors.birthday?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Application Photo<span className={classes.required}>*</span></p>
                    <input
                        tabIndex={currentStep === 1 ? 4 : -1}
                        type="file"
                        id="photo"
                        accept="image/*"
                        {...registerWithSave('photo')}
                        /*onChange={(event) => console.log(event)/!*TODO PHOTO regain when refreshing*!/}*/
                    />
                    <div
                        className={`${errors.photo?.message ? classes.error : classes.noError}`}>{errors.photo?.message}</div>
                </div>
            </>
        },
        {
            name: "Personal information II",
            fields: ['marital', 'nationality', 'confession', 'ssn'], // Required Fields
            html: <>
                <div className={`${classes.fieldWrapper}`}>
                    <p>Marital status<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 2 ? 1 : -1} type={"text"} {...registerWithSave('marital')}
                           placeholder={"Marital status"}/>
                    <div
                        className={`${errors.marital?.message ? classes.error : classes.noError}`}>{errors.marital?.message || ' '}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Nationality<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 2 ? 2 : -1}
                           type={"text"} {...registerWithSave('nationality')} placeholder={"Nationality"}/>
                    <div
                        className={`${errors.nationality?.message ? classes.error : classes.noError}`}>{errors.nationality?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Confession<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 2 ? 3 : -1}
                           type={"text"} {...registerWithSave('confession')} placeholder={"Confession"}/>
                    <div
                        className={`${errors.confession?.message ? classes.error : classes.noError}`}>{errors.confession?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Social security number<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 2 ? 4 : -1}
                           type={"text"} {...registerWithSave('ssn')} placeholder={"Social security number"}/>
                    <div
                        className={`${errors.ssn?.message ? classes.error : classes.noError}`}>{errors.ssn?.message}</div>
                </div>
            </>
        },
        {
            name: "Contact information",
            fields: ['mail', 'phone', 'street', 'zip', 'city'], // Required fields
            html: <>
                <div className={classes.fieldWrapper}>
                    <p>E-Mail address<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 3 ? 1 : -1}
                           type={"email"} {...registerWithSave('mail')} placeholder={"E-Mail address"}/>
                    <div
                        className={`${errors.mail?.message ? classes.error : classes.noError}`}>{errors.mail?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Phone number<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 3 ? 2 : -1}
                           type={"tel"} {...registerWithSave('phone')} placeholder={"Phone number"}/>
                    <div
                        className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Street and house number<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 3 ? 3 : -1}
                           type={"text"} {...registerWithSave('street')} placeholder={"Street + House number"}/>
                    <div
                        className={`${errors.street?.message ? classes.error : classes.noError}`}>{errors.street?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>ZIP<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 3 ? 4 : -1} type={"text"} {...registerWithSave('zip')}
                           placeholder={"Zip code"}/>
                    <div
                        className={`${errors.zip?.message ? classes.error : classes.noError}`}>{errors.zip?.message}</div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>City<span className={classes.required}>*</span></p>
                    <input tabIndex={currentStep === 3 ? 5 : -1}
                           type={"text"} {...registerWithSave('city')} placeholder={"City"}/>
                    <div
                        className={`${errors.city?.message ? classes.error : classes.noError}`}>{errors.city?.message}</div>
                </div>
            </>
        },
        {
            name: "About your Job",
            fields: ['currentEmployment', 'earnings', 'desiredEmployment', 'salary', 'entry'], // Required fields
            html: <>
                <div className={classes.fieldWrapper}>
                    <p>Current Employment<span className={classes.required}>*</span></p>
                    <select defaultValue={"Please select..."}
                            tabIndex={currentStep === 4 ? 1 : -1} {...registerWithSave('currentEmployment')}>
                        <option value={"Please select..."} hidden={true}>Please select...</option>
                        {currentEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.currentEmployment?.message ? classes.error : classes.noError}`}>{errors.currentEmployment?.message}
                    </div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Other earnings<span className={classes.required}>*</span></p>
                    <select defaultValue={"Please select..."}
                            tabIndex={currentStep === 4 ? 2 : -1} {...registerWithSave('earnings')}>
                        <option value={"Please select..."} hidden={true}>Please select...</option>
                        {otherEarnings.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.earnings?.message ? classes.error : classes.noError}`}>{errors.earnings?.message}
                    </div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Desired Employment<span className={classes.required}>*</span></p>
                    <select defaultValue={"Please select..."}
                            tabIndex={currentStep === 4 ? 3 : -1} {...registerWithSave('desiredEmployment')}>
                        <option value={"Please select..."} hidden={true}>Please select...</option>
                        {desiredEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div
                        className={`${errors.desiredEmployment?.message ? classes.error : classes.noError}`}>{errors.desiredEmployment?.message}
                    </div>
                </div>
                <div className={classes.fieldWrapper}>
                    <div>
                        <p>Desired salary (net in €)<span className={classes.required}>*</span></p>
                        <input tabIndex={currentStep === 4 ? 4 : -1}
                               type={"tel"} {...registerWithSave('salary')} placeholder={"Salary"}/>
                        <div
                            className={`${errors.salary?.message ? classes.error : classes.noError}`}>{errors.salary?.message}</div>
                    </div>
                </div>
                <div className={classes.fieldWrapper}>
                    <div>
                        <p>Entry date<span className={classes.required}>*</span></p>
                        <input tabIndex={currentStep === 4 ? 5 : -1}
                               type={"date"} {...registerWithSave('entry')} />
                        <div
                            className={`${errors.entry?.message ? classes.error : classes.noError}`}>{errors.entry?.message}</div>
                    </div>
                </div>
                <div className={classes.fieldWrapper}>
                    <p>Previous experience</p>
                    <textarea tabIndex={currentStep === 4 ? 6 : -1} rows={5} {...registerWithSave('experience')}
                              placeholder={"Tell us about your experience"}/>
                    <div
                        className={`${errors.experience?.message ? classes.error : classes.noError}`}>{errors.experience?.message}</div>
                </div>
            </>
        },
        {
            name: "Availability",
            fields: ['availability'],
            html: <>
                <div className={classes.fieldWrapper}>
                    <p>When are you available?<span className={classes.required}>*</span></p>
                    <table className={classes.availabilityTable}>
                        <thead>
                        <tr>
                            <th>Start<br/>Shift</th>
                            {days.map(day => <th key={day}>{day}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {shifts.map((option, shiftIndex) => (
                            <tr key={option}>
                                <td>{option}</td>
                                {days.map((day, dayIndex) => (
                                    <td key={`${day}-${option}`}>
                                        <input autoFocus={false}
                                               tabIndex={currentStep === 5 ? (shiftIndex * days.length) + dayIndex : -1}
                                               type="checkbox"
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
                <div className={classes.availabilityButtons}>
                    <button tabIndex={currentStep === 5 ? (shifts.length * days.length) : -1} type="button"
                            onClick={fillAllAvailability} className={"button-confirm"}>Always available
                    </button>
                    <button tabIndex={currentStep === 5 ? (shifts.length * days.length) + 1 : -1} type="button"
                            onClick={clearAllAvailability} className={"button-warning"}>Clear selection
                    </button>
                </div>
            </>
        },
        {
            name: "Additional",
            fields: [],
            html:
                <>
                    <div className={classes.fieldWrapper}>
                        <p>More about you!<br/>If you have anything you want to tell us about you, feel free:</p>
                        <textarea tabIndex={currentStep === 6 ? 1 : -1}
                                  rows={5} {...registerWithSave('motivation')}
                                  placeholder={"Tell us about you or your motivation"}/>
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

    useEffect(() => {
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
                    // Check if the value is a File or an array containing at least one File object that's not empty
                    const isNonEmptyFileArray = value && value instanceof FileList && value[0] instanceof File && value[0].size > 0;
                    if (isNonEmptyFileArray) {
                        setSelectedFile(value[0])
                    }
                    // Determine if the value is valid based on type
                    return isNonEmptyText || isCheckboxChecked || isArrayWithCheckedBoxes | isNonEmptyFileArray;
                })
        }

        function noErrorsGlobal() {
            return errors !== null && Object.keys(errors).length === 0
        }

        if ((currentStep < steps.length - 1 && requiredHaveContent()) || (currentStep === steps.length - 1 && requiredHaveContent() && noErrorsGlobal())) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
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
            if (noErrorsCurrentStep()) {
                className = classes.done;
            } else {
                className = classes.incomplete;
            }
            //TODO Wenn in einem Step was fehlt, sollte es gelb sein, wenn
        }

        return (
            <li
                className={className}
                key={idx}
                onClick={(e) => handleGoTo(idx, e)}
            >
                {section.name}
            </li>
        );
    });

    function handleSave(formContent) {
        console.log(prepareData(formContent))
        console.log(formContent)
        setSubmitted(true)
        const dataToSend = new FormData();
        dataToSend.append('emailContent', prepareDataHTML(formContent));

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
                    /*console.warn('Message sent but photo could not be attached');
                    alert('Message sent but photo could not be attached'); // Or handle this more gracefully in your UI*/
                } else {
                    console.log('Message sent successfully');
                }
                setAnswered(true)
                setSuccessful(true);
            })
            .catch(error => {
                console.log('Could not send application, please send it manually.')
                /*console.error('Error:', error);
                alert('Message could not be sent'); // Or display this error more gracefully*/
                setFormData(formContent)
                setAnswered(true)
                setSuccessful(false);
            });
    }

    function handleReset(event) {
        event.preventDefault()
        resetForm();
    }

    // TODO: REMOVE IF NOT NECESSARY ANYMORE
    function prefill(number) {
        if (number >= 0) {
            setValue('confirmation', true)
        }
        if (number > 0) {
            setValue('firstName', "JAN")
            setValue('lastName', "KRÄMER")
            setValue('birthday', "1990-05-16")
            setValue('nationality', "DE")
        }
        if (number > 1) {
            setValue('mail', "j.k@web.de")
            setValue('phone', "+49 151 51005000")
            setValue('street', "STREE XX")
            setValue('zip', "123456")
            setValue('city', "MUC")
        }
        if (number > 2) {
            setValue('currentEmployment', 'Student')
            setValue('desiredEmployment', 'Teilzeit')
            setValue('salary', "1")
            setValue('entry', "2025-01-01")
        }
        if (number > 3) {
            setValue('availability.Montag[0]', true)
        }
        const arr = []
        for (let i = 0; i < number + 1; i++) {
            arr.push(i);
        }
        setVisited(arr)
    }

    return (
        <>
            {resetting && <Reset text={"Preparing job form..."}/>}
            {!resetting && !submitted &&
                <form onSubmit={handleSubmit(handleSave)} className={`${classes.formContainer}`}>
                    <div className={classes.toPage}><a tabIndex={995} href={"/"}
                                                       target={'_self'}><IoChevronBackOutline/>
                        <p>Back home</p>
                    </a><ThemeSwitch isOnAbsolute={false} />
                        <button tabIndex={996} className={classes.borderlessBtn} onClick={handleReset}><IoTrashOutline
                            color={"#F44336FF"}/> Reset
                        </button>
                    </div>
                    <div className={classes.sectionWrapper} id={"jfsw"}>
                        {steps.map((step, index) => {
                                let order = index < currentStep ? classes.left : index === currentStep ? classes.center : classes.right
                                order = index === currentStep ? classes.center : order
                                return <section key={index}
                                                className={`${classes.scrollable} ${order}`}
                                                ref={(el) => (refArray.current[index] = el)}>
                                    <div className={classes.stepWrapper}>
                                        {step.html}
                                    </div>
                                </section>
                            }
                        )}
                    </div>
                    <div className={classes.controlBar}>
                        <div className={classes.directNav}>
                            <ul className={classes.navigationElements}>
                                {navigationElements}
                            </ul>
                        </div>
                        <div className={classes.buttons}>
                            {currentStep !== 0 && <button tabIndex={991} onClick={handleBackClick}
                                                          className={`${classes.ctrlBtn} ${classes.enabled} secondary`}>BACK
                            </button>}
                            {currentStep !== steps.length - 1 ?
                                <button disabled={buttonDisabled} tabIndex={990} onClick={handleNextClick}
                                        className={`${classes.ctrlBtn}  ${buttonDisabled ? 'button-disabled' : 'button-confirm'}`}>NEXT
                                </button> : <button disabled={buttonDisabled} tabIndex={990} type={"submit"}
                                                    className={`${classes.ctrlBtn} ${buttonDisabled ? 'button-disabled' : 'button-confirm'}`}>SUBMIT
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