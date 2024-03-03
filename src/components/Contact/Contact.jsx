import classes from "./Contact.module.scss"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {string, z} from "zod";
import {useEffect, useState} from "react";
import NavigationOptions from "../Locations/SingleLocation/NavigationOptions/NavigationOptions.jsx";
import VerticalTable from "../VerticalTable/VerticalTable.jsx";


const defaultValues = {
    firstName: '',
    lastName: '',
    mail: '',
    type: 'Please select...',
    subject: '',
    message: '',
    confirmation: false
}
const schema = z.object({})

function Contact(props) {
    const [typeIsOther, setTypeIsOther] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue,
        getValues,
        trigger,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'all',
        defaultValues: defaultValues,
    });

    let watched = watch('type')

    useEffect(() => {
        const subjectType = getValues('type')
        if (subjectType === 'other') {
            setTypeIsOther(true)
            console.log("INVOKATION IN TRUE")
        } else {
            setTypeIsOther(false)
            console.log("INVOKATION IN FALSE")
        }
    }, [watched]);


    return (
        <div className={classes.splitview}>
            <div className={classes.contactInfo}>
                <VerticalTable heading={'OFFICE'} entries={
                    [{
                        title: "Address",
                        description: <><p>{"SOME STREET"}</p>
                            <p>{"11111"} {"Augsburg"}</p></>
                    }, {
                        title: 'Mail',
                        description: <a href={`mailto:kontakt@heyzel.de`}>{"kontakt@heyzel.de"}</a>
                    },
                        {
                            title: 'Phone',
                            description: "+49 821 450448-0"
                        }, {
                        title: 'Fax',
                        description: "+49 821 450448-22"
                    }]
                }/>
            </div>
            <form className={classes.formContainer}>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>First name:</p>
                        <input type={'text'} {...register('firstName')} placeholder={'Your first name'}/>
                    </div>
                    <div>
                        <p>Last name<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('lastName')} placeholder={'Your last name'}/>
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>Mail<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('firstName')} placeholder={'john.doe@dodo.com'}/>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <input type={'text'} {...register('lastName')} placeholder={'+49 123 456789'}/>
                    </div>
                </div>
                <div className={`${classes.rowWrapper}`}>
                    <div>
                        <p>Subject<span className={classes.required}>*</span>: </p>
                        <select defaultValue={"Please select..."}
                                {...register('type')}>
                            <option value={"Please select..."} hidden={true}>Please select...</option>
                            <option value={'Booking'}>Book location</option>
                            <option value={'Complain'}>Complain</option>
                            <option value={'other'}>Other...</option>
                        </select>
                        <div
                            className={`${errors.type?.message ? classes.error : classes.noError}`}>{errors.type?.message}
                        </div>
                    </div>
                    {typeIsOther && <div>
                        <p><span>Custom subject:</span></p>
                        <input type={'text'} max={50} {...register('subject')} placeholder={'General request'}/>
                    </div>}
                </div>
                <div className={classes.rowWrapper}>
                    <div className={classes.fullWidth}>
                        <p>Message<span className={classes.required}>*</span>:</p>
                        <textarea rows={5} maxLength={1000} {...register('message')}
                                  placeholder={"Your message here..."}/>
                    </div>
                    <div className={`${errors.message?.message ? classes.error : classes.noError}`}>
                        {errors.message?.message}
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div className={`${classes.confirmation}`}>
                        <input id={'confirm'} type={"checkbox"} {...register('confirmation')}/>
                        <label htmlFor={'confirm'}>Please confirm that you have read and agreed to our <a
                            href={"#"} target={'_blank'} rel="noreferrer">terms
                            of privacy</a> on how we use the data.<span className={classes.required}>*</span></label>
                    </div>
                    <div className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>
                        {errors.confirmation?.message}
                    </div>
                </div>
                <button></button>
            </form>
        </div>
    );
}

export default Contact;