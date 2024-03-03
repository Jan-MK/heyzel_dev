import classes from "./VerticalTable.module.scss"
import NavigationOptions from "../Locations/SingleLocation/NavigationOptions/NavigationOptions.jsx";

function VerticalTable({heading, entries}) {
    const renderedEntries = entries.map((entry, idx) => {
        return <div key={entry.title + idx} className={classes.entries}>
            <div className={classes.heading}><p>{entry.title}</p></div>
            <div className={classes.info}>
                {entry.description}
            </div>
        </div>
    })
    return (
        <>
            <h4 className={classes.tableHeading}>{heading}</h4>
            <div className={classes.adjTable}>
                {renderedEntries}
            </div>
        </>
    );
}

export default VerticalTable;