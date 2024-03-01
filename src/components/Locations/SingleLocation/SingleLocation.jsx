import classes from "./SingleLocation.module.scss"
import NavigationOptions from "./NavigationOptions/NavigationOptions.jsx";

function SingleLocation({title, description, address, appleUrl, googleUrl, mail, phone, openingHours, lastHeadLineRef}) {
    const {street, zip, city} = address
    const renderedOpeningHours = openingHours.map((element, idx) => {
        return <tr key={idx}>
            <td>{element.day}</td>
            <td>{element.hours}</td>
        </tr>
    })
    return (<>
            <h1 className={classes.locationTitle} ref={lastHeadLineRef ? lastHeadLineRef : null}>{title}</h1>
            <p className={classes.description}>{description}</p>
            <div className={classes.generalInformation}>
                <h4 className={classes.tableHeading}>Contact</h4>
                <table className={classes.infoTable}>
                    <tbody>
                        <tr>
                            <td className={classes.bold}>Address:</td>
                            <td>
                                <p>{street}</p>
                                <p>{zip} {city}</p>
                                <NavigationOptions
                                    appleUrl={appleUrl}
                                    googleUrl={googleUrl}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={classes.bold}>Mail:</td>
                            <td><a href={`mailto:${mail}`}>{mail}</a></td>
                        </tr>
                        <tr>
                            <td className={classes.bold}>Phone:</td>
                            <td>{phone}</td>
                        </tr>
                    </tbody>
                </table>
                <h4 className={classes.tableHeading}>Opening hours</h4>
                <table className={classes.infoTable}>
                    <tbody>
                        <tr>
                            <th>Day</th>
                            <th>Hours</th>
                        </tr>
                        {renderedOpeningHours}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SingleLocation;