import classes from "./Contact.module.scss"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect, useState} from "react";
import VerticalTable from "../VerticalTable/VerticalTable.jsx";
import {Link} from "react-router-dom";
import {MdSubdirectoryArrowRight} from "react-icons/md";
import HighlightBox from "../HighlightBox/HighlightBox.jsx";
import {legalArray} from "../../utility/Utility.jsx";
import {useModal} from "../../context/ModalContext.jsx";
import LegalModal from "../LegalModal/LegalModal.jsx";


const defaultValues = {
    firstName: '',
    lastName: '',
    mail: '',
    type: 'Please select...',
    subject: '',
    message: '',
    confirmation: false
}


function Contact() {
    const [typeIsOther, setTypeIsOther] = useState(false)
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
    const { openModal } = useModal();

    function createSchema(typeIsOther) {
        return z.object({
            firstName: z.string().optional(),
            lastName: z.string().min(1, {message: "Last name is required"}),
            mail: z.string().min(1, {message: "E-Mail address is required"}).email("This is not a valid email."),
            type: z.string().min(1, {message: "Please choose the subject"})
                .refine(val => val !== 'Please select...', {message: "Please choose the subject"}),
            subject: z.string().refine(val => !typeIsOther || (typeIsOther && val.length >= 1), {
                message: "Required or choose between predefined.",
            }),
            message: z.string().min(1),
            confirmation: z.boolean().refine(bool => bool === true, {message: "You must accept the terms."}),
        });
    }


    const watchType = watch("type");

    // Use useEffect to react to changes in 'type' field
    useEffect(() => {
        console.log("CHANGE IN TYPE")
        setTypeIsOther(watchType === 'other')
    }, [watchType]);

    const handleSave = (formData) => {
        trigger()
        if (Object.keys(errors).length !== 0) {
            reset(formData)
            trigger()
        } else {
            console.log("OK Submit")
        }
    }



    return (
        <div className={classes.splitview}>
            <div className={classes.contactInfo}>
                <HighlightBox />
                <VerticalTable contentSizeBig={false} heading={'OFFICE'} entries={
                    [{
                        title: "Address",
                        description: <><p>{"SOME STREET"}</p>
                            <p>{"11111"} {"Augsburg"}</p></>
                    }, {
                        title: 'Mail',
                        description: <a href={`mailto:kontakt@heyzel.de`}>{"kontakt@heyzel.de"}</a>
                    }, {
                        title: 'Phone',
                        description: "+49 821 450448-0"
                    }, {
                        title: 'Fax',
                        description: "+49 821 450448-22"
                    }]
                }/>

            </div>
            <form className={classes.formContainer} onSubmit={handleSubmit(handleSave)}>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>First name:</p>
                        <input type={'text'} {...register('firstName')} placeholder={'Your first name'}/>
                    </div>
                    <div>
                        <p>Last name<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('lastName')} placeholder={'Your last name'}/>
                        <div
                            className={`${errors.lastName?.message ? classes.error : classes.noError}`}>{errors.lastName?.message}
                        </div>
                    </div>
                </div>
                <div className={classes.rowWrapper}>
                    <div>
                        <p>Mail<span className={classes.required}>*</span>:</p>
                        <input type={'text'} {...register('mail')} placeholder={'john.doe@dodo.com'}/>
                        <div
                            className={`${errors.eMail?.message ? classes.error : classes.noError}`}>{errors.eMail?.message}
                        </div>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <input type={'text'} {...register('phone')} placeholder={'+49 123 456789'}/>
                        <div
                            className={`${errors.phone?.message ? classes.error : classes.noError}`}>{errors.phone?.message}
                        </div>
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
                        <p>Custom subject<span className={classes.required}>*</span>:</p>
                        <input type={'text'} max={50} {...register('subject')} placeholder={'General request'}/>
                        <div className={`${errors.subject?.message ? classes.error : classes.noError}`}>
                            {errors.subject?.message}
                        </div>
                    </div>}
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={classes.fullWidth}>
                        <p>Message<span className={classes.required}>*</span>:</p>
                        <textarea rows={5} maxLength={1000} {...register('message')}
                                  placeholder={"Your message here..."}/>
                    </div>
                    <div className={`${errors.message?.message ? classes.error : classes.noError}`}>
                        {errors.message?.message}
                    </div>
                </div>
                <div className={`${classes.rowWrapper} ${classes.notRowFlex}`}>
                    <div className={`${classes.confirmation}`}>
                        <input id={'confirm'} type={"checkbox"} {...register('confirmation')}/>
                        <label>Please confirm that you have read and agreed to our <a onClick={() => openModal(<LegalModal showImprint={false} />)}>terms of privacy</a> on how we use the data.<span className={classes.required}>*</span></label>
                    </div>
                    <div className={`${errors.confirmation?.message ? classes.error : classes.noError}`}>
                        {errors.confirmation?.message}
                    </div>
                </div>
                <button disabled={!isValid} type={"submit"} className={`${classes.submit}`}>SUBMIT</button>
            </form>
        </div>
    );
}

export default Contact;