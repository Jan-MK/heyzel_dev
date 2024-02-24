import classes from "./JobFormOld.module.scss"
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from 'zod'
import gsap from 'gsap';
import {IoChevronBackOutline, IoTrashOutline} from "react-icons/io5";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.jsx";
import Submitted from "../JobForm/Submitted/Submitted.jsx";
import Reset from "../JobForm/Reset/Reset.jsx";
/*
import Cookies from 'universal-cookie';
*/


const currentEmploymentOptions = ["Schüler", "Student", "Vollzeitanstellung", "Teilzeitanstellung", "Selbstständig", "Arbeitssuchend"]
const desiredEmploymentOptions = ["Vollzeit", "Teilzeit", "Werksstudent", "Minijob (450€ Basis)"]
/*const countryOptions = [
    {value: "asgard", label: "Asgard"},
    {value: "germany", label: "Germany"},
    {value: "usa", label: "USA"},
]*/
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const shifts = ['Frühschicht', 'Mittagsschicht', 'Spätschicht', 'Abendschicht'];

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
    nationality: string().min(1, {message: 'Nationality is required.'}),
    mail: string().email(),
    phone: string().min(1, {message: 'Phone number is required.'}),
    street: string().min(1, {message: 'Street is required.'}),
    zip: string().min(1, {message: 'Zip code is required.'}),
    city: string().min(1, {message: 'City is required.'}),
    entry: z.string()
        .refine(val => !isNaN(Date.parse(val)), {message: 'Entry must be a valid date.'})
        .refine(val => new Date(val) > today, {message: 'Entry date must be in the future.'}),
    salary: z.string()
        .transform(val => parseFloat(val)) // Transform the string to a number for validation.
        .refine(val => !isNaN(val), {message: 'Salary must be a number.'}),
    experience: string().optional(),
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
    currentEmployment: string().optional(),
    desiredEmployment: string().optional(),
})


function JobFormOld(props) {
    // TODO: TabIndex for each section, prevent back from leaving this form
    const [formData, setFormData] = useState("")
    const [currentSection, setCurrentSection] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [resetting, setResetting] = useState(true)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [successful, setSuccessful] = useState(null);
    const [, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const sectionWrapperRef = useRef(null);
    /*
        const cookie = new Cookies()
    */

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
        defaultValues: {
            currentEmployment: "Please select...",
            desiredEmployment: "Please select...",
            confirmation: false,
            availability: days.reduce((acc, day) => ({...acc, [day]: [false, false, false, false]}), {}),
        },
    });

    function resetForm() {
        setResetting(true)
        setVisited([0])
        setCurrentSection(0);
        reset();
        watched = steps.map(step => {
            return step.fields.map(field => {
                return watch(field)
            })
        })
        gsap.to(sectionWrapperRef.current, {
            x: 0,
            duration: 1,
            ease: "power2.inOut", // Add easing for smoother transition
            onComplete: () => {
                // Ensure the first section scrolls into view after the GSAP animation completes
                requestAnimationFrame(() => {
                    const firstSection = document.querySelector('section');
                    if (firstSection) {
                        firstSection.scrollIntoView({behavior: 'instant', block: 'nearest', inline: 'start'});
                    }
                    requestAnimationFrame(() => setResetting(false))
                });
            }
        });
    }


    useEffect(() => {
        setResetting(true)
        document.body.style.overflowX = 'hidden'; // Prevent manual scrolling
        console.log(document.body.style.position)
        document.body.style.position = 'fixed'; // Prevent manual scrolling
        document.body.style.overscrollBehavior = 'none';

        resetForm()
        prefill(5)
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            const viewportWidth = window.innerWidth;
            const distanceToTranslate = -currentSection * viewportWidth;
            gsap.to(sectionWrapperRef.current, {
                x: distanceToTranslate,
                duration: 0,
                ease: "none"
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [window.innerWidth])


    useEffect(() => {
        // Recalculate transform on resize
        const updateTransform = () => {
            const viewportWidth = window.innerWidth;
            const distanceToTranslate = -currentSection * viewportWidth;
            gsap.to(sectionWrapperRef.current, {
                x: distanceToTranslate,
                duration: 0.5,
                ease: "power2.inOut",
            });
        };


        updateTransform(); // Call on resize to adjust the section position

    }, [currentSection]);

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
        const fieldsToValidate = steps[currentSection]?.fields;
        // Use the extracted validation function

        const result = await checkValidity(fieldsToValidate);

        if (result && currentSection < steps.length - 1) {
            setCurrentSection(currentSection + 1);
            if (!visited.includes(currentSection + 1)) {
                setVisited(prev => {
                    return [...prev, currentSection + 1]
                })
            }
        } else {
            console.log("Validation failed or it's the last step.");
        }
    };

    const handleBackClick = (event) => {
        event.preventDefault()
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    let steps = [
        {
            name: "Privacy confirmation",
            fields: ['confirmation'], // Required Fields
            html: <>
                <>
                    <div className={"reverseOrder"}>
                        <h2>Job application form</h2>
                        <p>Welcome to our</p>
                    </div>
                    <div className={classes.sameRow}>
                        <input className={classes.cbSmall} tabIndex={currentSection === 0 ? 0 : -1}
                               type={"checkbox"} {...register('confirmation')}/>
                        <p>To proceed with the application process confirm that you have read and agreed to our <a
                            href={"#"} target={'_blank'}>terms
                            of privacy</a> on how we use the data.<span className={classes.required}>*</span></p>
                    </div>
                    <div className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>{errors.confirmation?.message}</div>
                </>
            </>
        },
        {
            name: "Personal information",
            fields: ['firstName', 'lastName', 'birthday', 'nationality'], // Required Fields
            html: <>
                <div>
                    <p>First name<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 1 ? 0 : -1} type={"text"} {...register('firstName')}
                           placeholder={"First name"}/>
                    <div className={`${errors.firstName?.message ? classes.error : classes.noError}`}>{errors.firstName?.message || ' '}</div>
                </div>
                <div>
                    <p>Last Name<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 1 ? 1 : -1}
                           type={"text"} {...register('lastName')} placeholder={"Last name"}/>
                    <div className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}</div>
                </div>
                <div>
                    <p>Birthday<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 1 ? 2 : -1}
                           type={"date"} {...register('birthday')} />
                    <div className={`${errors.birthday?.message ? classes.error : classes.noError}`}>{errors.birthday?.message}</div>
                </div>
                <div>
                    <p>Nationality<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 1 ? 3 : -1}
                           type={"text"} {...register('nationality')} placeholder={"Nationality"}/>
                    <div className={`${errors.nationality?.message ? classes.error : classes.noError}`}>{errors.nationality?.message}</div>
                </div>
            </>
        },
        {
            name: "Contact information",
            fields: ['mail', 'phone', 'street', 'zip', 'city'], // Required fields
            html: <>
                <div>
                    <p>E-Mail address<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 2 ? 0 : -1}
                           type={"email"} {...register('mail')} placeholder={"E-Mail address"}/>
                    <div className={`${errors.mail?.message ? classes.error : classes.noError}`}>{errors.mail?.message}</div>
                </div>
                <div>
                    <p>Phone number<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 2 ? 1 : -1}
                           type={"tel"} {...register('phone')} placeholder={"Phone number"}/>
                    <div className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}</div>
                </div>
                <div>
                    <p>Street and house number<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 2 ? 2 : -1}
                           type={"text"} {...register('street')} placeholder={"Street + House number"}/>
                    <div className={`${errors.street?.message ? classes.error : classes.noError}`}>{errors.street?.message}</div>
                </div>
                <div>
                    <p>ZIP<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 2 ? 3 : -1} type={"text"} {...register('zip')}
                           placeholder={"Zip code"}/>
                    <div className={`${errors.zip?.message ? classes.error : classes.noError}`}>{errors.zip?.message}</div>
                </div>
                <div>
                    <p>City<span className={classes.required}>*</span></p>
                    <input tabIndex={currentSection === 2 ? 4 : -1}
                           type={"text"} {...register('city')} placeholder={"City"}/>
                    <div className={`${errors.city?.message ? classes.error : classes.noError}`}>{errors.city?.message}</div>
                </div>
            </>
        },
        {
            name: "About you",
            fields: ['currentEmployment', 'desiredEmployment', 'salary', 'entry'], // Required fields
            html: <>

                <div>
                    <p>Current Employment<span className={classes.required}>*</span></p>
                    <select defaultValue={"Please select..."} tabIndex={currentSection === 3 ? 0 : -1} {...register('currentEmployment')}>
                        <option value={"Please select..."} hidden={true}>Please select...</option>
                        {currentEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Desired Employment<span className={classes.required}>*</span></p>
                    <select defaultValue={"Please select..."} tabIndex={currentSection === 3 ? 1 : -1} {...register('desiredEmployment')}>
                        <option value={"Please select..."} hidden={true}>Please select...</option>
                        {desiredEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>
                        <p>Desired salary (net in €)<span className={classes.required}>*</span></p>
                        <input tabIndex={currentSection === 3 ? 2 : -1}
                               type={"tel"} {...register('salary')} placeholder={"Salary"}/>
                        <div className={`${errors.salary?.message ? classes.error : classes.noError}`}>{errors.salary?.message}</div>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Entry date<span className={classes.required}>*</span></p>
                        <input tabIndex={currentSection === 3 ? 3 : -1}
                               type={"date"} {...register('entry')} />
                        <div className={`${errors.entry?.message ? classes.error : classes.noError}`}>{errors.entry?.message}</div>
                    </div>
                </div>
                <div>
                    <p>Previous experience</p>
                    <textarea tabIndex={currentSection === 3 ? 4 : -1} rows={5} {...register('experience')}
                              placeholder={"Tell us about your experience"}/>
                    <div className={`${errors.experience?.message ? classes.error : classes.noError}`}>{errors.experience?.message}</div>
                </div>
            </>
        },
        {
            name: "Availability",
            fields: ['availability'],
            html: <>
                <div>
                    <p>When are you available?<span className={classes.required}>*</span></p>
                    <table className={classes.availabilityTable}>
                        <thead>
                        <tr>
                            <th>Availability</th>
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
                                               tabIndex={currentSection === 4 ? (shiftIndex * days.length) + dayIndex : -1}
                                               type="checkbox"
                                               {...register(`availability.${day}[${shiftIndex}]`)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div
                    className={`${errors.availability?.message ? classes.error : classes.noError} ${classes.preventoverscroll}`}>{errors.availability?.message}</div>
                <div className={classes.availabilityButtons}>
                    <button tabIndex={currentSection === 4 ? (shifts.length * days.length) : -1} type="button"
                            onClick={fillAllAvailability} className={"button-confirm"}>Always available
                    </button>
                    <button tabIndex={currentSection === 4 ? (shifts.length * days.length) + 1 : -1} type="button"
                            onClick={clearAllAvailability} className={"button-warning"}>Clear selection
                    </button>
                </div>
            </>
        },
        {
            name: "Motivation",
            fields: [],
            html:
                <>
                    <div>
                        <div>
                            <p>More about you!<br/>If you have anything you want to tell us about you, feel free:</p>
                            <textarea tabIndex={currentSection === 5 ? 0 : -1}
                                      rows={5} {...register('motivation')}
                                      placeholder={"Tell us about you or your motivation"}/>
                            <div
                                className={`${errors.motivation?.message ? classes.error : classes.noError}`}>{errors.motivation?.message}</div>
                        </div>
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
            function checkAtLeastOneCheckboxChecked(matrix) {
                return Object.values(matrix).some(dayCheckboxes =>
                    dayCheckboxes.some(isChecked => isChecked === true)
                );
            }

            return watched[currentSection]
                .every(value => (value !== '' && value !== false && value !== 'Please select...'
                    && (typeof value !== 'object'
                        || checkAtLeastOneCheckboxChecked(value)
                    )))
        }

        if (requiredHaveContent()) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [currentSection, watched]);

    const navigationElements = steps.map((section, idx) => {
        const handleClick = () => {
            if (currentSection > idx || visited.includes(idx)) {
                setCurrentSection(idx);
            }
        };

        let className = classes.open;
        if (currentSection === idx) {
            className = classes.current;
        } else if (currentSection > idx || visited.includes(idx)) {
            className = classes.done;
        }

        return (
            <li
                className={className}
                key={idx}
                onClick={handleClick}
            >
                {section.name}
            </li>
        );
    });

    function handleSave(formValues) {
        setSubmitted(true); // TODO: Handle answer and transport it to Submitted.jsx
        setFormData(formValues);


        setSuccessful(false);
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
                <form onSubmit={handleSubmit(handleSave)}
                      className={`${classes.formContainer}`}>
                    <div className={classes.sectionWrapper} ref={sectionWrapperRef} id={"jfsw"}>
                        {steps.map((step, index) => (
                            <section key={index}
                                     className={`${classes.scrollable} ${currentSection === index ? classes.current : classes.hidden}`}>
                                <div className={classes.stepWrapper}>
                                    {step.html}
                                </div>
                            </section>
                        ))}
                    </div>
                    <div className={classes.toPage}><a tabIndex={995} href={"/"}
                                                       target={'_self'}><IoChevronBackOutline/>
                        <p>Back home</p>
                    </a><ThemeSwitch/>
                        <button tabIndex={996} className={classes.borderlessBtn} onClick={handleReset}><IoTrashOutline
                            color={"#F44336FF"}/> Reset
                        </button>
                    </div>
                    <div className={classes.controlBar}>
                        <div>
                            <ul className={classes.navigationElements}>
                                {navigationElements}
                            </ul>
                        </div>
                        <div className={classes.buttons}>
                            {currentSection !== 0 && <button tabIndex={991} onClick={handleBackClick}
                                                             className={`${classes.ctrlBtn} ${classes.enabled} secondary`}>BACK
                            </button>}
                            {currentSection !== steps.length - 1 ?
                                <button disabled={buttonDisabled} tabIndex={990} onClick={handleNextClick}
                                        className={`${classes.ctrlBtn}  ${buttonDisabled ? 'button-disabled' : 'button-confirm'}`}>NEXT
                                </button> : <button disabled={buttonDisabled} tabIndex={990} type={"submit"}
                                                    className={`${classes.ctrlBtn} button-confirm`}>SUBMIT
                                </button>}
                        </div>
                    </div>
                </form>}
            {!resetting && submitted && <Submitted show={submitted} successful={successful} formData={formData} />}
        </>
    );
}

export default JobFormOld;