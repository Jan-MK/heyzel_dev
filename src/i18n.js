import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'de',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    hero: {
                        top: "A <1>unique<1> vibe",
                        dscr: "Good talks, working between meetings, pre-party at night - we've got you!",
                    },
                    general: {
                        switch: "Wechsle zu",
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
                    },
                    cardMenu: {
                        title: "Coffee, Drinks & Snacks",
                        dscr: "Dive into our menu featuring a variety of coffees, from classic espressos to rich lattes, alongside house-made ice teas and crafted cocktails. Plus, enjoy a selection of delectable snacks perfect for any time of day.",
                        day: {
                            title: "Tasty coffee.",
                            subtitle: "During the day",
                            dscr: "From expertly brewed plain coffee to a variety of special blends, we got you.",
                            btn: "Day menu",
                        },
                        night: {
                            title: "Amazing cocktails.",
                            subtitle: "Afterwork",
                            dscr: "Transitioned to a bar at night we offer drinks and snacks while you're invited to enjoy the atmosphere.",
                            btn: "Bar menu",
                        },
                        food: {
                            title: "Food & Snacks",
                            dscr: "A small variety of food and snacks to avoid you being hangry!",
                            btn: "Show me food",
                        },
                        coffee: {
                            title: "We love coffee",
                            dscr: "And we're picky! Discover our coffee selection",
                            btn: "Discover",
                        }
                    },
                    locations: {
                        title: "Locations",
                        dscr: "Dive into our menu featuring a variety of coffees, from classic espressos to rich lattes, alongside house-made ice teas and crafted cocktails. Plus, enjoy a selection of delectable snacks perfect for any time of day.",
                        general: {
                            t1: {
                                title: "Get in touch",
                                sub1: "Address",
                                sub2: "Mail",
                                sub3: "Phone"
                            },
                            t2: {
                                title: "Opening hours",
                                sub1: "Days",
                                sub2: "Hours",
                            }
                        }, loc1: {
                            title: 'Königsplatz',
                            dscr: 'Grab a Peach Iced Tea at Königsplatz with friends. Chill vibes, cool tunes, and the perfect spot to unwind and catch up.',
                            openingHours: {
                                e1: {
                                    title: 'Mon - Thurs',
                                    dscr: '7 AM - 11 PM',
                                },
                                e2: {
                                    title: 'Fri',
                                    dscr: '7 AM - 10 PM',
                                },
                                e3: {
                                    title: 'Sat',
                                    dscr: '12 PM - 10 PM',
                                },
                                e4: {
                                    title: 'Sun',
                                    dscr: 'closed',
                                },
                            },
                        },
                        loc2: {
                            title: 'Rathausplatz',
                            dscr: 'Start your day with a coffee or Caramelito at Rathausplatz. Embrace the morning energy in a spot that buzzes with life and flavor.',
                            openingHours: {
                                e1: {
                                    title: 'Mon - Sat',
                                    dscr: '9:30 AM - 1 AM',
                                },
                                e2: {
                                    title: 'Sun',
                                    dscr: '11 AM - 1 AM',
                                },
                            },
                        },
                        loc3: {
                            title: 'Universität',
                            dscr: 'Between courses or for a student hangout, Universität is your go-to. Sip on motivation with our Mango Lassi and embrace the campus spirit.',
                            appleUrl: 'https://maps.apple.com/?address=Salomon-Idler-Stra%C3%9Fe%2024D,%2086159%20Augsburg,%20Deutschland&auid=3153212030896744291&ll=48.333709,10.899892&lsp=9902&q=Heyzel%20Coffee',
                            googleUrl: 'https://maps.app.goo.gl/GSGcfWKiUCFqiLYT9',
                            mail: 'uni@heyzel.de',
                            phone: '+49 821 4504480',
                            openingHours: {
                                e1: {
                                    title: 'Mon - Fri',
                                    dscr: '7:30 AM - 10 PM',
                                },
                                e2: {
                                    title: 'Sat',
                                    dscr: '11 AM - 6 PM',
                                },
                                e3: {
                                    title: 'Sun',
                                    dscr: 'closed',
                                },
                            },
                        },
                    },
                    contact: {
                        general: {
                            sub1: "Address",
                            sub2: "Mail",
                            sub3: "Phone",
                        },
                        highlight: {
                            title: "You want to work <1>@HEYZEL</1>?",
                            dscr: "Looking to join the coolest crew in town? @HEYZEL is where it's at! If you love coffee, good vibes, and making people's day, we want you. Come be a part of us. Apply now and let's make some magic happen together!",
                            btn: "Apply now!"
                        },
                        form: {
                            fn: {
                                label: "First name",
                                ph: "Your first name",
                            },
                            ln: {
                                label: "Last name",
                                ph: "Your last name",
                                err: "This is required"
                            },
                            mail: {
                                label: "E-Mail Adress",
                                ph: "Your e-mail address",
                                err1: "This is required",
                                err2: "This is not a valid email"
                            },
                            phone: {
                                label: "Phone number",
                                ph: "+49 123 456789",
                            },
                            type: {
                                label: "Subject",
                                ph: "Please select...",
                                err: "Please choose the subject",
                                options: {
                                    o1: {
                                        val: 'Booking',
                                        label: 'Book location'
                                    },
                                    o2: {
                                        val: 'Complain',
                                        label: 'Complain'
                                    },
                                    o3: {
                                        val: 'Other',
                                        label: 'Other...'
                                    }
                                }
                            },
                            sub: {
                                label: "Custom subject",
                                ph: "What's it about?",
                                err: "Required or choose from list",
                            },
                            msg: {
                                label: "Message",
                                ph: "What do you want to tell us?",
                                err: "This is required"
                            },
                            conf: {
                                label: "Please confirm that you have read and agreed to our <1>terms of privacy</1> on how we use the data.",
                                err: "This is required"
                            },
                            btn: "Submit"
                        }
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
                        switch: "Switch to",
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
                    },
                    cardMenu: {
                        title: "Kaffee, Getränke und Snacks",
                        dscr: "Tauch ein in unsere Speisekarte, die eine Vielzahl von Kaffees bietet – von klassischen Espressos bis hin zu reichhaltigen Lattes, neben hausgemachten Eistees und handgemachten Cocktails. Genieße außerdem eine Auswahl köstlicher Snacks, perfekt für jede Tageszeit.",
                        day: {
                            title: "Leckerer Kaffee.",
                            subtitle: "Tagsüber",
                            dscr: "Von meisterhaft gebrühtem einfachen Kaffee bis hin zu einer Vielzahl besonderer Mischungen, wir haben, was Du brauchst.",
                            btn: "Kaffeegetränke",
                        },
                        night: {
                            title: "Fantastische Cocktails",
                            subtitle: "Nach der Arbeit",
                            dscr: "Nachts verwandeln wir uns in eine Bar, in der wir Getränke und Snacks anbieten, während Du eingeladen bist, die Atmosphäre zu genießen.",
                            btn: "Barkarte",
                        },
                        food: {
                            title: "Essen & Snacks",
                            dscr: "Eine kleine Auswahl an Speisen und Snacks, damit Du nicht hungrig bleibst!",
                            btn: "Zeig mir Essen",
                        },
                        coffee: {
                            title: "Wir lieben Kaffee",
                            dscr: "Und wir sind wählerisch! Entdecke unsere Kaffeeauswahl",
                            btn: "Entdecken",
                        }
                    },
                    locations: {
                        title: "Standorte",
                        dscr: "Tauch ein in unsere Speisekarte, die eine Vielzahl von Kaffees bietet – von klassischen Espressos bis hin zu reichhaltigen Lattes, neben hausgemachten Eistees und handgemachten Cocktails. Genieße außerdem eine Auswahl köstlicher Snacks, perfekt für jede Tageszeit.",
                        general: {
                            t1: {
                                title: "Kontakt",
                                sub1: "Address",
                                sub2: "E-Mail",
                                sub3: "Telefon"
                            },
                            t2: {
                                title: "Öffnungszeiten",
                                sub1: "Tage",
                                sub2: "Zeiten",
                            }
                        },
                        loc1: {
                            title: 'Königsplatz',
                            dscr: 'Schnapp dir einen Pfirsich-Eistee am Königsplatz mit Freunden. Entspannte Vibes, coole Musik und der perfekte Ort, um abzuschalten und aufzuholen.',
                            openingHours: {
                                e1: {
                                    title: 'Mo - Do',
                                    dscr: '7 - 23',
                                },
                                e2: {
                                    title: 'Fri',
                                    dscr: '7 - 22',
                                },
                                e3: {
                                    title: 'Sat',
                                    dscr: '12 - 22',
                                },
                                e4: {
                                    title: 'So',
                                    dscr: 'geschlossen',
                                },
                            },
                        },
                        loc2: {
                            title: 'Rathausplatz',
                            dscr: 'Beginne deinen Tag mit einem Kaffee oder Caramelito am Rathausplatz. Genieße die Morgenenergie an einem Ort, der vor Leben und Geschmack sprüht.',
                            openingHours: {
                                e1: {
                                    title: 'Mo - Sa',
                                    dscr: '9:30 - 1',
                                },
                                e2: {
                                    title: 'So',
                                    dscr: '11 - 1',
                                },
                            },
                        },
                        loc3: {
                            title: 'Universität',
                            dscr: 'Zwischen Vorlesungen oder für ein Studententreffen, Universität ist deine Anlaufstelle. Schlürfe Motivation mit unserem Mango Lassi und tauche ein in den Campusgeist.',
                            appleUrl: 'https://maps.apple.com/?address=Salomon-Idler-Stra%C3%9Fe%2024D,%2086159%20Augsburg,%20Deutschland&auid=3153212030896744291&ll=48.333709,10.899892&lsp=9902&q=Heyzel%20Coffee',
                            googleUrl: 'https://maps.app.goo.gl/GSGcfWKiUCFqiLYT9',
                            mail: 'uni@heyzel.de',
                            phone: '+49 821 4504480',
                            openingHours: {
                                e1: {
                                    title: 'Mo - Fr',
                                    dscr: '7:30 - 22',
                                },
                                e2: {
                                    title: 'Sa',
                                    dscr: '11 - 18',
                                },
                                e3: {
                                    title: 'So',
                                    dscr: 'geschlossen',
                                },
                            },
                        },
                    },
                    contact: {
                        general: {
                            sub1: "Addresse",
                            sub2: "E-Mail",
                            sub3: "Telefon",
                        },
                        highlight: {
                            title: "Ein Job <1>@HEYZEL</1>?",
                            dscr: "Du willst Teil der coolsten Crew der Stadt werden? @HEYZEL ist genau der richtige Ort dafür! Wenn Du Kaffee liebst, gute Vibes schätzt und gerne den Tag von Menschen verschönerst, dann wollen wir Dich! Bewirb Dich jetzt und lass uns gemeinsam Magie erschaffen!",
                            btn: "Jetzt bewerben!"
                        },
                        form: {
                            fn: {
                                label: "Vorname",
                                ph: "Dein Vorname",
                            },
                            ln: {
                                label: "Nachname",
                                ph: "Dein Nachname",
                                err: "Dies ist ein Pflichtfeld"
                            },
                            mail: {
                                label: "E-Mail Adresse",
                                ph: "Deine E-Mail Adresse",
                                err1: "Dies ist ein Pflichtfeld",
                                err2: "E-Mail Adresse ungültig"
                            },
                            phone: {
                                label: "Telefonnummer",
                                ph: "+49 123 456789",
                            },
                            type: {
                                label: "Betreff",
                                ph: "Bitte wählen...",
                                err: "Triff eine Auswahl",
                                options: {
                                    o1: {
                                        val: 'Buchung',
                                        label: 'Standort Buchen'
                                    },
                                    o2: {
                                        val: 'Beschwerde',
                                        label: 'Beschwerde vorbringen'
                                    },
                                    o3: {
                                        val: 'Andere',
                                        label: 'Andere...'
                                    }
                                }
                            },
                            sub: {
                                label: "Eigener Betreff",
                                ph: "Worum geht's?",
                                err: "Pflichtfeld, oder wähle aus der Liste.",
                            },
                            msg: {
                                label: "Nachricht",
                                ph: "Was möchtest Du uns mitteilen?",
                                err: "Dies ist ein Pflichtfeld"
                            },
                            conf: {
                                label: "Bitte bestätige, dass Du unsere <1>Datenschutzrichtlinie</1> gelesen hast und akzeptierst.",
                                labelen: "Please confirm that you have read and agreed to our <1>terms of privacy</1> on how we use the data.",
                                err: "Dies ist ein Pflichtfeld"
                            },
                            btn: "Senden"
                        }
                    }
                }
            }
        }
    });

export default i18n;