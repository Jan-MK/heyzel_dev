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
                        dscr: "Step into HEYZEL: A world of vibrant flavors, chill tunes, and the perfect ambiance for every part of your day.",
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
                    },
                    jobForm: {
                        general: {
                            selectPH: "Please select...",
                            resetForm: "Preparing job form...",
                            backLabel: "Back Home",
                            resetLabel: "Reset",
                            btn: {
                                back: "Back",
                                next: "Next",
                                sbm: "Submit"
                            }
                        },
                        intro: {
                            title: "Job application form",
                            sub: "Welcome to our"
                        },
                        steps: {
                            desktop: {
                                s1: "Welcome",
                                s2: "Personal information I",
                                s3: "Personal information II",
                                s4: "Contact information",
                                s5: "About your job",
                                s6: "Availability",
                                s7: "Additional",
                            },
                            tablet: "Step",
                        },
                        conf: {
                            label: "Please confirm that you have read and agreed to our <1>terms of privacy</1> on how we use the data.",
                            err: "This is required"
                        },
                        desiredEmp: {
                            label: "Desired Employment",
                            ph: "Please select...",
                            err1: "This is required",
                            err2: "Currently we are not searching for an employee for the chosen employment",
                            options: {
                                o1: {
                                    val: 'full-time',
                                    label: 'Full-time'
                                },
                                o2: {
                                    val: 'part-time',
                                    label: 'Part-time'
                                },
                                o3: {
                                    val: 'working-student',
                                    label: 'Working student'
                                },
                                o4: {
                                    val: 'minijob',
                                    label: 'Mini-Job (520€-basis)'
                                }
                            },
                        },
                        fn: {
                            label: "First name",
                            ph: "E.g., Alex",
                            err: "This is required"
                        },
                        ln: {
                            label: "Last name",
                            ph: "E.g., Smith",
                            err: "This is required"
                        },
                        birthday: {
                            label: "Birthday",
                            ph: "DD-MM-YYYY",
                            err1: "Birthday must be a valid date",
                            err2: "You must be at least 18 years old"
                        },
                        photo: {
                            label: "Application-photo (portrait)",
                            err1: "Maximum image size is 5MB.",
                            err2: "Only .jpg, .jpeg, .png, and .webp formats are supported."
                        },
                        nationality: {
                            label: "Nationality",
                            ph: "Please select...",
                            err: "This is required"
                        },
                        confession: {
                            label: "Denomination",
                            ph: "E.g., Catholic",
                            err: "This is required"
                        },
                        ssn: {
                            label: "Social security number",
                            ph: "E.g., 123-45-6789"
                        },
                        mail: {
                            label: "E-Mail Address",
                            ph: "E.g., alex.smith@example.com",
                            err1: "This is required",
                            err2: "This is not a valid email"
                        },
                        phone: {
                            label: "Phone number",
                            ph: "E.g., +49 151 234 56789",
                            err: "This is required"
                        },
                        street: {
                            label: "Street & House number",
                            ph: "E.g., Main St 123",
                            err: "This is required"
                        },
                        zip: {
                            label: "ZIP code",
                            ph: "E.g., 86150",
                            err: "This is required"
                        },
                        city: {
                            label: "City",
                            ph: "E.g., Augsburg",
                            err: "This is required"
                        },
                        currentEmp: {
                            label: "Current Employment",
                            ph: "Please select...",
                            err: "This is required",
                            options: {
                                o1: {
                                    val: 'pupils',
                                    label: 'Pupils'
                                },
                                o2: {
                                    val: 'student',
                                    label: 'Student'
                                },
                                o3: {
                                    val: 'employee',
                                    label: 'Employee'
                                },
                                o4: {
                                    val: 'self-employed',
                                    label: 'Self-employed'
                                },
                                o5: {
                                    val: 'unemployed',
                                    label: 'Unemployed/job seeker'
                                }
                            },
                        },
                        earnings: {
                            label: "Other earnings",
                            ph: "Please select...",
                            err: "This is required",
                            options: {
                                o1: {
                                    val: 'bafoeg',
                                    label: 'BAföG'
                                },
                                o2: {
                                    val: 'child-benefit',
                                    label: 'Child benefit'
                                },
                                o3: {
                                    val: 'orphan-pension',
                                    label: `Orphans pension`,
                                },
                                o4: {
                                    val: 'none',
                                    label: 'None'
                                }
                            },
                        },
                        entry: {
                            label: "Entry date",
                            ph: "DD-MM-YYYY",
                            err1: "Entry must be a valid date",
                            err2: "Entry date must be in the future."
                        },
                        salary: {
                            label: "Desired salary (Hourly rate)",
                            ph: "E.g., 15€/hour",
                            err1: "This is required",
                            err2: "This has to be a valid number",
                            err3: "Please enter at maximum two decimals"
                        },
                        experience: {
                            label: "Prior experience",
                            ph: "State your experience, e.g., Barista at a local café for 2 years",
                            err: "This is required"
                        },
                        availability: {
                            label: "Your availability",
                            dscr: "The shift starts are variable between stated times.",
                            ex: "E.g. choosing early shift means we may plan your shift between 7:30am and 11:30am",
                            start: "Variable ",
                            shift: "start shift",
                            shifts: {
                                s0: {
                                    label: "Morning shift",
                                    time: "7:30am-11:30am"
                                },
                                s1: {
                                    label: "Day shift",
                                    time: "12am-4pm"
                                },
                                s2: {
                                    label: "Night shift",
                                    time: "4pm-11:30pm"
                                },
                                days: {
                                    d0: 'Monday',
                                    d1: 'Tuesday',
                                    d2: 'Wednesday',
                                    d3: 'Thursday',
                                    d4: 'Friday',
                                    d5: 'Saturday',
                                    d6: 'Sunday'
                                }
                            },
                            btn: {
                                fillAll: "Always available",
                                clearAll: "Clear choice"
                            },
                            err: "You must be available for at least one shift on any day."
                        },
                        motivation: {
                            label: "Motivation",
                            ph: "Tell us why you're excited to join the Heyzel team!",
                            err: "This is required"
                        },
                        submitted: {
                            status: {
                                sending: 'Sending your application...',
                                goTo: 'Back Home'
                            },
                            success: {
                                t1: "Awesome, thank you!",
                                t2: "We've received your application and will get back to you as soon as possible. Meanwhile, why not drop by for a coffee or a Margarita?",
                                t3: "Looking forward to seeing you :)",
                                t4: "Your Heyzel Team"
                            },
                            warning: {
                                t1: "Oops, something went a bit wrong!",
                                t2: "But don't worry, your effort hasn't gone to waste. Click the link below to send us your application via your own email program. Everything (except the photo) will be included automatically!",
                                t3: "Send via Email Now",
                                t4: "Your Heyzel Team"
                            },
                            error: {
                                t1: "Uh-oh, something went wrong!",
                                t2: "Unfortunately, we lost the data you entered. But don’t let that stop you! Feel free to send us an email to",
                                t3: "We’re looking forward to your message!",
                                t4: "Your Heyzel Team"
                            }
                        }
                    },
                    footer: {
                        imprint: "Imprint",
                        privacy: "Privacy",
                        rights: "All rights reserved."
                    }
                }
            },
            de: {
                translation: {
                    hero: {
                        top: "A <1>unique<1> vibe",
                        dscr: "Tauche ein in HEYZEL: Eine Welt voller lebendiger Aromen, entspannter Musik und der perfekten Atmosphäre für jeden Moment deines Tages.",
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
                                sub1: "Addresse",
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
                    },
                    jobForm: {
                        general: {
                            selectPH: "Bitte wählen...",
                            resetForm: "Jobformular wird vorbereitet...",
                            backLabel: "Zurück",
                            resetLabel: "Zurücksetzen",
                            btn: {
                                back: "Zurück",
                                next: "Weiter",
                                sbm: "Senden"
                            }
                        },
                        intro: {
                            title: "Bewerbungsformular",
                            sub: "Willkommen bei unserem"
                        },
                        steps: {
                            desktop: {
                                s1: "Willkommen",
                                s2: "Persönliche Informationen I",
                                s3: "Persönliche Informationen II",
                                s4: "Kontaktdaten",
                                s5: "Über Deinen Job",
                                s6: "Verfügbarkeit",
                                s7: "Motivation",
                            },
                            tablet: "Schritt",
                        },
                        conf: {
                            label: "Bitte bestätige, dass du unsere <1>Datenschutzbedingungen</1> gelesen hast und damit einverstanden bist, wie wir die Daten verwenden.",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        desiredEmp: {
                            label: "Angestrebtes Arbeitsverhältnis",
                            ph: "Bitte wählen...",
                            err1: "Dies ist ein Pflichtfeld",
                            err2: "Derzeit suchen wir keinen Mitarbeiter für die gewählte Anstellung",
                            options: {
                                o1: {
                                    val: 'full-time',
                                    label: 'Vollzeit'
                                },
                                o2: {
                                    val: 'part-time',
                                    label: 'Teilzeit'
                                },
                                o3: {
                                    val: 'working-student',
                                    label: 'Werkstudent'
                                },
                                o4: {
                                    val: 'minijob',
                                    label: 'Minijob (520€-Basis)'
                                }
                            },
                        },
                        fn: {
                            label: "Vorname",
                            ph: "z.B., Alex",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        ln: {
                            label: "Nachname",
                            ph: "z.B., Schmidt",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        birthday: {
                            label: "Geburtstag",
                            ph: "TT-MM-JJJJ",
                            err1: "Das Geburtsdatum muss ein gültiges Datum sein",
                            err2: "Du musst mindestens 18 Jahre alt sein"
                        },
                        photo: {
                            label: "Bewerbungsfoto (Porträt)",
                            err1: "Die maximale Bildgröße beträgt 5MB.",
                            err2: "Nur .jpg, .jpeg, .png und .webp Formate werden unterstützt."
                        },
                        nationality: {
                            label: "Staatsangehörigkeit",
                            ph: "Bitte wählen...",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        confession: {
                            label: "Konfession",
                            ph: "z.B., Katholisch",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        ssn: {
                            label: "Sozialversicherungsnummer",
                            ph: "z.B., 123-45-6789"
                        },
                        mail: {
                            label: "E-Mail Adresse",
                            ph: "z.B., alex.smith@example.com",
                            err1: "Dies ist ein Pflichtfeld",
                            err2: "Dies ist keine gültige E-Mail"
                        },
                        phone: {
                            label: "Telefonnummer",
                            ph: "z.B., +49 151 234 56789",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        street: {
                            label: "Straße & Hausnummer",
                            ph: "z.B., Hauptstr. 123",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        zip: {
                            label: "Postleitzahl",
                            ph: "z.B., 86150",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        city: {
                            label: "Stadt",
                            ph: "E.g., Augsburg",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        currentEmp: {
                            label: "Derzeitige Anstellung",
                            ph: "Bitte wählen...",
                            err: "Dies ist ein Pflichtfeld",
                            options: {
                                o1: {
                                    val: 'pupils',
                                    label: 'Schüler'
                                },
                                o2: {
                                    val: 'student',
                                    label: 'Student'
                                },
                                o3: {
                                    val: 'employee',
                                    label: 'Angestellter'
                                },
                                o4: {
                                    val: 'self-employed',
                                    label: 'Selbstständig'
                                },
                                o5: {
                                    val: 'unemployed',
                                    label: 'Arbeitssuchend/-los'
                                }
                            },
                        },
                        earnings: {
                            label: "Weitere Einkünfte",
                            ph: "Bitte wählen...",
                            err: "Dies ist ein Pflichtfeld",
                            options: {
                                o1: {
                                    val: 'bafoeg',
                                    label: 'BAföG'
                                },
                                o2: {
                                    val: 'child-benefit',
                                    label: 'Kindergeld'
                                },
                                o3: {
                                    val: 'orphan-pension',
                                    label: `Waisenrente`,
                                },
                                o4: {
                                    val: 'none',
                                    label: 'Keine'
                                }
                            },
                        },
                        entry: {
                            label: "Eintrittsdatum",
                            ph: "TT-MM-JJJJ",
                            err1: "Eintrittsdatum muss ein gültiges Datum sein",
                            err2: "Eintrittsdatum muss in der Zukunft liegen."
                        },
                        salary: {
                            label: "Gewünschtes Gehalt (Stundenlohn)",
                            ph: "z.B., 15,00",
                            err1: "Dies ist ein Pflichtfeld",
                            err2: "Dies muss eine gültige Zahl sein",
                            err3: "Die Zahl darf maximal 2 Nachkommastellen haben."
                        },
                        experience: {
                            label: "Vorherige Erfahrungen",
                            ph: "Deine Erfahrungen, z.B., Barista in einem lokalen Café für 2 Jahre",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        availability: {
                            label: "Deine Verfügbarkeit",
                            dscr: "Die Schichtanfänge sind variabel innerhalb der angegebenen Zeiten.",
                            ex: "z.B. die Wahl der Frühschicht bedeutet, dass wir Deine Schicht zwischen 7:30 und 11:30 Uhr planen können",
                            start: "Variabler ",
                            shift: "Schichtbeginn",
                            shifts: {
                                s0: {
                                    label: "Frühschicht",
                                    time: "7:30-11:30 Uhr"
                                },
                                s1: {
                                    label: "Tagschicht",
                                    time: "12-16 Uhr"
                                },
                                s2: {
                                    label: "Nachtschicht",
                                    time: "16-23:30 Uhr"
                                },
                                days: {
                                    d0: 'Montag',
                                    d1: 'Dienstag',
                                    d2: 'Mittwoch',
                                    d3: 'Donnerstag',
                                    d4: 'Freitag',
                                    d5: 'Samstag',
                                    d6: 'Sonntag'
                                }
                            },
                            btn: {
                                fillAll: "Immer verfügbar",
                                clearAll: "Auswahl löschen"
                            },
                            err: "Du musst für mindestens eine Schicht an einem beliebigen Tag verfügbar sein."
                        },
                        motivation: {
                            label: "Motivation",
                            ph: "Warum möchtest du bei Heyzel arbeiten? Erzähl uns davon!",
                            err: "Dies ist ein Pflichtfeld"
                        },
                        submitted: {
                            status: {
                                sending: 'Deine Bewerbung ist unterwegs...',
                                goTo: 'Zurück zur Startseite'
                            },
                            success: {
                                t1: "Super, vielen Dank!",
                                t2: "Wir haben Deine Bewerbung bekommen und melden uns bei Dir. Bis dahin, wie wär's mit einem Kaffee oder einer Margarita bei uns?",
                                t3: "Wir freuen uns auf Dich :)",
                                t4: "Dein Heyzel Team"
                            },
                            warning: {
                                t1: "Oops, da lief was nicht ganz rund!",
                                t2: "Aber keine Sorge, Deine Anstrengung war nicht umsonst. Nutz den Link unten, um uns deine Bewerbung per E-Mail zu schicken. Alles außer dem Foto wird automatisch eingefügt!",
                                t3: "Jetzt per E-Mail senden",
                                t4: "Dein Heyzel Team"
                            },
                            error: {
                                t1: "Uups, da ist was schiefgelaufen!",
                                t2: "Leider sind Deine Daten verloren gegangen. Aber lass den Kopf nicht hängen! Schick uns einfach eine E-Mail an:",
                                t3: "Wir freuen uns auf Deine Nachricht!",
                                t4: "Dein Heyzel Team"
                            }
                        }
                    },
                    footer: {
                       imprint: "Impressum",
                       privacy: "Datenschutz",
                       rights: "Alle Rechte vorbehalten."
                    }
                }
            }
        }
    })
;

export default i18n;