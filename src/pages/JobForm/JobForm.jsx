import classes from "./JobForm.module.scss"
import {useState} from "react";
import {useForm, useController} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {date, number, string, z} from 'zod'


const currentEmploymentOptions = ["Schüler", "Student", "Vollzeitanstellung", "Teilzeitanstellung", "Selbstständig", "Arbeitssuchend"]
const desiredEmploymentOptions = ["Vollzeit", "Teilzeit", "Werksstudent", "Minijob (450€ Basis)"]
const countryOptions = [
    {value: "asgard", label: "Asgard"},
    {value: "germany", label: "Germany"},
    {value: "usa", label: "USA"},
]
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const shifts = ['Frühschicht', 'Mittagsschicht', 'Spätschicht', 'Abendschicht'];

const today = new Date();
const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const schema = z.object({
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
    /*availability: z.object({
        Monday: z.array(z.boolean()),
        Tuesday: z.array(z.boolean()),
        Wednesday: z.array(z.boolean()),
        Thursday: z.array(z.boolean()),
        Friday: z.array(z.boolean()),
    }).refine(availability =>
            Object.values(availability).some(day => day.includes(true)),
        {
            message: "You must be available for at least one shift on any day.",
        }
    ),*/
    motivation: string().optional()
})

function JobForm(props) {
    const {
        register,
        handleSubmit,
        formState,
        setValue
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            availability: days.reduce((acc, day) => ({...acc, [day]: [false, false, false]}), {}),
        },
    });

    const {errors} = formState


    function handleSave(formValues) {
        console.log(formValues)
    }

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

    let steps = [
        <>
            <div>
                <p>First name</p>
                <input type={"text"} {...register('firstName')} placeholder={"First name"}/>
                <div style={{color: 'red'}}>{errors.firstName?.message}</div>
            </div>
            <div>
                <p>Last Name</p>
                <input type={"text"} {...register('lastName')} placeholder={"Last name"}/>
                <div style={{color: 'red'}}>{errors.lastName?.message}</div>
            </div>
            <div>
                <p>Birthday</p>
                <input type={"date"} {...register('birthday')} />
                <div style={{color: 'red'}}>{errors.birthday?.message}</div>
            </div>
            <div>
                <p>Nationality</p>
                <input type={"text"} {...register('nationality')} placeholder={"Nationality"}/>
                <div style={{color: 'red'}}>{errors.nationality?.message}</div>
            </div>
            ,
            <div>
                <p>E-Mail address</p>
                <input type={"email"} {...register('mail')} placeholder={"E-Mail address"}/>
                <div style={{color: 'red'}}>{errors.mail?.message}</div>
            </div>
            <div>
                <p>Phone number</p>
                <input type={"tel"} {...register('phone')} placeholder={"Phone number"}/>
                <div style={{color: 'red'}}>{errors.phone?.message}</div>
            </div>
        </>,
        <>
            <div>
                <p>Street and house number</p>
                <input type={"text"} {...register('street')} placeholder={"Street + House number"}/>
                <div style={{color: 'red'}}>{errors.street?.message}</div>
            </div>
            <div>
                <p>ZIP</p>
                <input type={"text"} {...register('zip')} placeholder={"Zip code"}/>
                <div style={{color: 'red'}}>{errors.zip?.message}</div>
            </div>
            <div>
                <p>City</p>
                <input type={"text"} {...register('city')} placeholder={"City"}/>
                <div style={{color: 'red'}}>{errors.city?.message}</div>
            </div>
        </>,
        <>
            <div>
                <p>Current Employment</p>
                <select {...register('currentEmployment')}>
                    {currentEmploymentOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Desired Employment</p>
                <select {...register('desiredEmployment')}>
                    {desiredEmploymentOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <p>Desired salary (net in €)</p>
                <input type={"number"} {...register('salary')} placeholder={"Salary"}/>
                <div style={{color: 'red'}}>{errors.salary?.message}</div>
            </div>
            <div>
                <p>Entry date</p>
                <input type={"date"} {...register('entry')} />
                <div style={{color: 'red'}}>{errors.entry?.message}</div>
            </div>
            <div>
                <p>Previous experience</p>
                <textarea rows={5} {...register('experience')} placeholder={"Tell us about your experience"}/>
                <div style={{color: 'red'}}>{errors.experience?.message}</div>
            </div>
        </>,
        <>
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
                    {shifts.map((option, optionIndex) => (
                        <tr key={option}>
                            <td>{option}</td>
                            {days.map(day => (
                                <td key={`${day}-${option}`}>
                                    <input
                                        type="checkbox"
                                        {...register(`availability.${day}[${optionIndex}]`)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div style={{color: 'red'}}>{errors.availability?.message}</div>
            <div>
                <button type="button" onClick={fillAllAvailability}>Always available</button>
                <button type="button" onClick={clearAllAvailability}>Clear selection</button>
            </div>
        </>,
        <>
            <div>
                <div>
                    <p>More about you: If you have anything you want to tell us about you, feel free:</p>
                    <textarea rows={5} {...register('motivation')}
                              placeholder={"Tell us about you or your motivation"}/>
                    <div style={{color: 'red'}}>{errors.motivation?.message}</div>
                </div>
            </div>
        </>
    ]

    console.log(errors)
    return (
        <div>
            <form onSubmit={handleSubmit(handleSave)}>
                {steps.map((step, idx) => <div key={idx}>{step}</div>)}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default JobForm;