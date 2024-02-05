import classes from "./JobForm.module.scss"
import {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from 'zod'
import Step from "./Step/Step.jsx";
import gsap from 'gsap';
import {IoChevronBackOutline, IoTrashOutline} from "react-icons/io5";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch.jsx";
/*
import Cookies from 'universal-cookie';
*/
import Submitted from "./Submitted/Submitted.jsx";


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
    }).refine(availability =>
            Object.values(availability).some(day => day.includes(true)),
        {
            message: "You must be available for at least one shift on any day.",
        }
    ),
    motivation: string().optional()
})

function JobForm(props) {

    const [currentSection, setCurrentSection] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true)
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
            confirmation: false,
            availability: days.reduce((acc, day) => ({...acc, [day]: [false, false, false, false]}), {}),
        },
    });


    useEffect(() => {
        document.body.style.overflowX = 'hidden'
        gsap.to(sectionWrapperRef.current, {
            x: 0,
            duration: 0.5,
            ease: "power2.inOut",
        })
        reset();
        setCurrentSection(0)
        setVisited([0])
        setSubmitted(false)
    }, [])

    useEffect(() => {
        // Calculate the width of the viewport
        const viewportWidth = window.innerWidth;
        // Calculate the distance to translate based on the current section
        const distanceToTranslate = -currentSection * viewportWidth;

        gsap.to(sectionWrapperRef.current, {
            x: distanceToTranslate,
            duration: 1,
            ease: "power2.inOut", // Add easing for smoother transition
        });
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
                        <p>To proceed with the application process confirm that you have read and agreed to our <a
                            href={"#"} target={'_blank'}>terms
                            of privacy</a> on how we use the data.<span className={classes.required}>*</span></p>
                        <input className={classes.cbSmall} tabIndex={currentSection === 0 ? 0 : -1}
                               type={"checkbox"} {...register('confirmation')}/>
                    </div>
                    <div style={{color: 'red'}}>{errors.confirmation?.message}</div>
                </>
            </>
        },
        {
            name: "Personal information",
            fields: ['firstName', 'lastName', 'birthday', 'nationality'], // Required Fields
            html: <>
                <div>
                    <p>First name</p>
                    <input tabIndex={currentSection === 1 ? 0 : -1} type={"text"} {...register('firstName')}
                           placeholder={"First name"}/>
                    <div style={{color: 'red'}}>{errors.firstName?.message}</div>
                </div>
                <div>
                    <p>Last Name</p>
                    <input tabIndex={currentSection === 1 ? 1 : -1}
                           type={"text"} {...register('lastName')} placeholder={"Last name"}/>
                    <div style={{color: 'red'}}>{errors.lastName?.message}</div>
                </div>
                <div>
                    <p>Birthday</p>
                    <input tabIndex={currentSection === 1 ? 2 : -1}
                           type={"date"} {...register('birthday')} />
                    <div style={{color: 'red'}}>{errors.birthday?.message}</div>
                </div>
                <div>
                    <p>Nationality</p>
                    <input tabIndex={currentSection === 1 ? 3 : -1}
                           type={"text"} {...register('nationality')} placeholder={"Nationality"}/>
                    <div style={{color: 'red'}}>{errors.nationality?.message}</div>
                </div>
            </>
        },
        {
            name: "Contact information",
            fields: ['mail', 'phone', 'street', 'zip', 'city'], // Required fields
            html: <>
                <div>
                    <p>E-Mail address</p>
                    <input tabIndex={currentSection === 2 ? 0 : -1}
                           type={"email"} {...register('mail')} placeholder={"E-Mail address"}/>
                    <div style={{color: 'red'}}>{errors.mail?.message}</div>
                </div>
                <div>
                    <p>Phone number</p>
                    <input tabIndex={currentSection === 2 ? 1 : -1}
                           type={"tel"} {...register('phone')} placeholder={"Phone number"}/>
                    <div style={{color: 'red'}}>{errors.phone?.message}</div>
                </div>
                <div>
                    <p>Street and house number</p>
                    <input tabIndex={currentSection === 2 ? 2 : -1}
                           type={"text"} {...register('street')} placeholder={"Street + House number"}/>
                    <div style={{color: 'red'}}>{errors.street?.message}</div>
                </div>
                <div>
                    <p>ZIP</p>
                    <input tabIndex={currentSection === 2 ? 3 : -1} type={"text"} {...register('zip')}
                           placeholder={"Zip code"}/>
                    <div style={{color: 'red'}}>{errors.zip?.message}</div>
                </div>
                <div>
                    <p>City</p>
                    <input tabIndex={currentSection === 2 ? 4 : -1}
                           type={"text"} {...register('city')} placeholder={"City"}/>
                    <div style={{color: 'red'}}>{errors.city?.message}</div>
                </div>
            </>
        },
        {
            name: "About you",
            fields: ['currentEmployment', 'desiredEmployment', 'salary', 'entry'], // Required fields
            html: <>

                <div>
                    <p>Current Employment</p>
                    <select autoFocus={false}
                            defaultValue={"Please select..."}
                            tabIndex={currentSection === 3 ? 0 : -1} {...register('currentEmployment')}>
                        {currentEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Desired Employment</p>
                    <select autoFocus={false}
                            defaultValue={"Please select..."}
                            tabIndex={currentSection === 3 ? 1 : -1} {...register('desiredEmployment')}>
                        {desiredEmploymentOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <div>
                        <p>Desired salary (net in €)</p>
                        <input tabIndex={currentSection === 3 ? 2 : -1}
                               type={"number"} {...register('salary')} placeholder={"Salary"}/>
                        <div style={{color: 'red'}}>{errors.salary?.message}</div>
                    </div>
                </div>
                <div>
                    <div>
                        <p>Entry date</p>
                        <input tabIndex={currentSection === 3 ? 3 : -1}
                               type={"date"} {...register('entry')} />
                        <div style={{color: 'red'}}>{errors.entry?.message}</div>
                    </div>
                </div>
                <div>
                    <p>Previous experience</p>
                    <textarea tabIndex={currentSection === 3 ? 4 : -1} rows={5} {...register('experience')}
                              placeholder={"Tell us about your experience"}/>
                    <div style={{color: 'red'}}>{errors.experience?.message}</div>
                </div>
            </>
        },
        {
            name: "Availability",
            fields: ['availability'],
            html: <>
                <div>
                    <p>When are you available?</p>
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
                <div style={{color: 'red'}}>{errors.availability?.message}</div>
                <div className={classes.availabilityButtons}>
                    <button tabIndex={currentSection === 4 ? (shifts.length * days.length) : -1} type="button"
                            onClick={fillAllAvailability}>Always available
                    </button>
                    <button tabIndex={currentSection === 4 ? (shifts.length * days.length) + 1 : -1} type="button"
                            onClick={clearAllAvailability}>Clear selection
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
                            <p>More about you: If you have anything you want to tell us about you, feel free:</p>
                            <textarea tabIndex={currentSection === 5 ? 0 : -1}
                                      rows={5} {...register('motivation')}
                                      placeholder={"Tell us about you or your motivation"}/>
                            <div style={{color: 'red'}}>{errors.motivation?.message}</div>
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

        console.log(watched)
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
        setSubmitted(true);
        console.log(formValues)
    }

    function handleReset(event) {
        event.preventDefault()
        setVisited([])
        setCurrentSection(0);
        gsap.to(sectionWrapperRef.current, {
            x: 0,
            duration: 1,
            ease: "power2.inOut", // Add easing for smoother transition
        });
        reset();
        watched = steps.map(step => {
            return step.fields.map(field => {
                return watch(field)
            })
        })
    }

    return (
        <>
            {!submitted && <form onSubmit={handleSubmit(handleSave)}
                   className={`${classes.formContainer}`}>
                <div className={classes.sectionWrapper} ref={sectionWrapperRef} id={"jfsw"}>
                    {steps.map((step, index) => (
                        <section key={index}
                                 className={`${classes.scrollable}`}>
                            <Step currentSection={currentSection} sectionIndex={index}>
                                {step.html}
                            </Step>
                        </section>
                    ))}
                </div>
                <div className={classes.toPage}><a tabIndex={995} href={"/"} target={'_self'}><IoChevronBackOutline/>
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
                                                         className={`${classes.ctrlBtn} ${classes.enabled}`}>BACK
                        </button>}
                        {currentSection !== steps.length - 1 ?
                            <button disabled={buttonDisabled} tabIndex={990} onClick={handleNextClick}
                                    className={`${classes.ctrlBtn}`}>NEXT
                            </button> : <button disabled={buttonDisabled} tabIndex={990} type={"submit"}
                                                className={`${classes.ctrlBtn}`}>SUBMIT
                            </button>}
                    </div>
                </div>
            </form>}
            <Submitted show={submitted} response={"SOME RESPONSE"}/>
        </>
    );
}

export default JobForm;