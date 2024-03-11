import classes from "./SingleLocation.module.scss"
import NavigationOptions from "./NavigationOptions/NavigationOptions.jsx";
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
                            lastHeadLineRef,
                            headlineId
                        }) {
    const {street, zip, city} = address

    return (<>

            <h1 className={classes.locationTitle} ref={lastHeadLineRef ? lastHeadLineRef : null} id={headlineId ? 'headlineId': ''}>{title}</h1>
            <p className={classes.description}>{description}</p>
            <div className={classes.generalInformation}>
                <VerticalTable
                    contentSizeBig={true}
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
                    contentSizeBig={true}
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