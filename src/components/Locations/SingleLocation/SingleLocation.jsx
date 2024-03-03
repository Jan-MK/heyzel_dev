import classes from "./SingleLocation.module.scss"
import NavigationOptions from "./NavigationOptions/NavigationOptions.jsx";
import {getRandomColor} from "../../../utility/Utility.jsx";
import VerticalTable from "../../VerticalTable/VerticalTable.jsx";

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


    const {bg, text} = getRandomColor()
    return (<>
            <h1 className={classes.locationTitle} ref={lastHeadLineRef ? lastHeadLineRef : null}
                style={{textDecorationColor: getRandomColor().bg}}
            >{title}</h1>
            <p className={classes.description}>{description}</p>
            <div className={classes.generalInformation}>
                <VerticalTable
                    heading={'Contact'}
                    entries={[
                        {
                            title: "Address",
                            description: <><p>{street}</p>
                                <p>{zip} {city}</p>
                                <NavigationOptions
                                    appleUrl={appleUrl}
                                    googleUrl={googleUrl}
                                /></>
                        },
                        {
                            title: "Mail:",
                            description: <a href={`mailto:${mail}`}>{mail}</a>
                        },
                        {
                            title: "Phone:",
                            description: phone,
                        }
                    ]}
                />
                <VerticalTable
                    heading="Opening hours"
                    entries={[
                        {title: 'Day', description: <p className={classes.heading}>Hours</p>},
                        ...openingHours
                    ]}
                />
            </div>
        </>
    );
}

export default SingleLocation;