import classes from "./SingleLocation.module.scss"
import NavigationOptions from "./NavigationOptions/NavigationOptions.jsx";
import {getRandomColor} from "../../../utility/Utility.jsx";

function SingleLocation({
                            title,
                            description,
                            address,
                            appleUrl,
                            googleUrl,
                            mail,
                            phone,
                            openingHours,
                            lastHeadLineRef
                        }) {
    const {street, zip, city} = address
    const renderedOpeningHours = openingHours.map((element, idx) => {
        return <tr key={idx}>
            <td>{element.day}</td>
            <td>{element.hours}</td>
        </tr>
    })

    const renderedOpeningHours2 = openingHours.map((element, idx) => {
        return <div key={idx} className={classes.entries}>
            <div className={classes.heading}>
                <p>{element.day}</p>
            </div>
            <div className={classes.info}>
                <p>{element.hours}</p>
            </div>
        </div>
    })

    const {bg, text} = getRandomColor()
    return (<>
            <h1 className={classes.locationTitle} ref={lastHeadLineRef ? lastHeadLineRef : null}
                style={{textDecorationColor: getRandomColor().bg}}
            >{title}</h1>{/*
            <div className={classes.headingContainer}>
                <h1 className={classes.locationTitle}>{title}</h1>
                <h1 className={`${classes.locationTitleBack} ${classes.locationTitle}`} style={{textDecorationColor: bg, color: bg}}>{title}</h1>
            </div>*/}
{/*            <div className={classes.headingContainer3} style={{ '--location-title-bg-color': bg }}>
                <h1 className={classes.locationTitle}>{title}</h1>
            </div>*/}
            <p className={classes.description}>{description}</p>
            <div className={classes.generalInformation}>
                <h4 className={classes.tableHeading}>Contact</h4>
                <div className={classes.adjTable}>
                    <div className={classes.entries}>
                        <div className={classes.heading}>
                            <p>Address:</p>
                        </div>
                        <div className={classes.info}>
                            <p>{street}</p>
                            <p>{zip} {city}</p>
                            <NavigationOptions
                                appleUrl={appleUrl}
                                googleUrl={googleUrl}
                            />
                        </div>
                    </div>
                    <div className={classes.entries}>
                        <div className={classes.heading}><p>Mail:</p></div>
                        <div className={classes.info}>
                            <a href={`mailto:${mail}`}>{mail}</a>
                        </div>
                    </div>
                    <div className={classes.entries}>
                        <div className={classes.heading}><p>Phone:</p></div>
                        <div className={classes.info}>
                            <p>{phone}</p>
                        </div>
                    </div>
                </div>
                <h4 className={classes.tableHeading}>Opening hours</h4>
                <div className={classes.adjTable}>
                    <div className={classes.entries}>
                        <div className={classes.heading}>
                            <p>Day</p>
                        </div>
                        <div className={classes.info}>
                            <p className={classes.heading}>Hours</p>
                        </div>
                    </div>
                    {renderedOpeningHours2}
                </div>
            </div>
        </>
    );
}

export default SingleLocation;