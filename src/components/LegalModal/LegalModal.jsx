import classes from './LegalModal.module.scss'
import {legalArray} from "../../utility/Vars.jsx";
import ReactCountryFlag from "react-country-flag";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";


function LegalModal({showImprint}) {
    const {t, i18n} = useTranslation();

    const disclaimer = i18n.resolvedLanguage !== 'de' && <div className={classes.disclaimer}>
        <h1>Disclaimer: Automated Translation </h1>
        <p>Please note that this English version of the {showImprint ? 'Legal Notice' : 'Privacy Policy'} has been generated using an automated translation tool. It is provided for convenience and informational purposes only. We do not guarantee the completeness or accuracy of the translated content. The original German version of this document is the official and legally binding version. In case of any discrepancies between the German and the English version, the German version shall prevail.</p>
    </div>

    if (showImprint) {
        return <div className={classes.content}>
            <button className={'third'}
                    onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en')}>
                {t('general.switch')}
                <ReactCountryFlag svg style={{width: '25px', height: 'auto'}}
                                  countryCode={i18n.resolvedLanguage === 'en' ? 'DE' : 'GB'}/>
            </button>
            {disclaimer}
            {legalArray[0][i18n.resolvedLanguage].content}
        </div>
    }
    // PRIVACY
    return <div className={classes.content}>
        <button className={'third'}
                onClick={() => i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'de' : 'en')}>
            {t('general.switch')}
            <ReactCountryFlag svg style={{width: '25px', height: 'auto'}}
                              countryCode={i18n.resolvedLanguage === 'en' ? 'DE' : 'GB'}/>
        </button>
        {disclaimer}
        {legalArray[1][i18n.resolvedLanguage].content}
    </div>
        ;
}

export default LegalModal;