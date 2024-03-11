import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    hero: {
                        top: "A <1>unique<1> vibe",
                        dscr: "Good talks, working between meetings, pre-party at night - we've got you!",
                    },
                    general: {
                        switch: "Switch to",
                        mode: "Dark / Light"
                    },
                    menu: {
                        hours: "Opening hours",
                        goTo: "Quicklinks",
                        about: "About",
                        events: "Events",
                        menu: "Menu",
                        locations: "Locations",
                        contact: "Contact",
                        jobs: "Jobs",
                        food: "Food",
                        drinks: "Drinks",
                    }
                }
            },
            de: {
                translation: {
                    hero: {
                        top: "A <1>unique<1> vibe",
                        dscr: "Gute Gespräche, arbeite zwischen Meetings oder zum Vorglühen - hier bist Du richtig!",
                    },
                    general: {
                        switch: "Wechseln zu",
                        mode: "Dunkel / Hell"
                    },
                    menu: {
                        hours: "Öffnungszeiten",
                        goTo: "Schnellzugriff",
                        about: "Über",
                        events: "Events",
                        menu: "Speisekarte",
                        locations: "Standorte",
                        contact: "Kontakt",
                        jobs: "Jobs",
                        food: "Speisen",
                        drinks: "Getränke",
                    }
                }
            }
        }
    });

export default i18n;