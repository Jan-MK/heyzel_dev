import classes from "./SingleLocation.module.scss"
import NavigationOptions from "./NavigationOptions/NavigationOptions.jsx";
import VerticalTable from "../../VerticalTable/VerticalTable.jsx";
import {useTranslation} from "react-i18next";

function SingleLocation({
                            title,
                            description,
                            address,
                            appleUrl,
                            googleUrl,
                            openingHours,
                            lastHeadLineRef,
                            headlineId
                        }) {
    const {street, zip, city} = address
    const { t } = useTranslation();


    return (<>

            <h1 className={classes.locationTitle} ref={lastHeadLineRef ? lastHeadLineRef : null} id={headlineId ? 'headlineId': ''}>{title}</h1>
            <p className={classes.description}>{description}</p>
            <div className={classes.generalInformation}>
                <VerticalTable
                    contentSizeBig={true}
                    heading={t('locations.general.t1.title')}
                    entries={[
                        {
                            title: t('locations.general.t1.sub1'),
                            description: <><p>{street}</p>
                                <p>{zip} {city}</p>
                                <NavigationOptions
                                    appleUrl={appleUrl}
                                    googleUrl={googleUrl}
                                /></>
                        }
                    ]}
                />
                <VerticalTable
                    contentSizeBig={true}
                    heading={t('locations.general.t2.title')}
                    entries={[
                        {
                            title: t('locations.general.t2.sub1'),
                            description: <p className={classes.heading}>{t('locations.general.t2.sub2')}</p>
                        },
                        ...openingHours
                    ]}
                />
            </div>
        </>
    );
}

export default SingleLocation;