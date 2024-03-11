import classes from "./VerticalTable.module.scss"


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function VerticalTable({contentSizeBig, heading, entries}) {
    const renderedEntries = entries.map((entry, idx) => {
        // Determine the description content based on the type of entry.description
        let descriptionContent;
        if (typeof entry.description === 'string') {
            if (emailRegex.test(entry.description)) {
                descriptionContent = <a href={`mailto:${entry.description}`}>{entry.description}</a>;
            } else {
                descriptionContent = <p>{entry.description}</p>;
            }
        } else {
            // Directly use entry.description as it's assumed to be JSX already
            descriptionContent = entry.description;
        }

        return (
            <div key={entry.title + idx} className={`${classes.entries} ${contentSizeBig && classes.big}`}>
                <div className={`${classes.heading} ${contentSizeBig && classes.big}`}><p>{entry.title}</p></div>
                <div className={`${classes.info} ${contentSizeBig && classes.big}`}>
                    {descriptionContent}
                </div>
            </div>
        );
    });
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