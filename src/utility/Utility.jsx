export const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
export const shifts = ['7:30', '13:00', '16:00'];
export const randomColors = [
    {
        bg: '#68c1c9',
        text: '#000'
    }, {
        bg: '#ffd400',
        text: '#000'
    }, {
        bg: '#9697c0',
        text: '#fff'
    }, {
        bg: '#00c5d1',
        text: '#000'
    }, /*{
        bg: '#d60f84',
        text: '#fff'
    },*/ {
        bg: '#70BAFF',
        text: '#fff'
    }, {
        bg: '#FE0879',
        text: '#fff'
    }
]

export function getRandomColor() {
    return randomColors[Math.floor(Math.random() * randomColors.length)]
}

function shuffleArray(array) {
    let tempArray = array.slice();
    for (let i = tempArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]]; // Swap
    }
    return tempArray;
}

export function getDistinctRandomHex(number, exlusion) {
    let result = [];
    let array = []
    if (exlusion) {
        array = randomColors.filter(el => el.bg !== exlusion)
    } else {
        array = randomColors.slice()
    }
    while (number > 0) {
        const shuffledColors = shuffleArray(array);
        const needed = Math.min(number, shuffledColors.length);
        result = result.concat(shuffledColors.slice(0, needed));
        number -= needed;
    }
    return result;
}


export function prepareData(formData) {
    let content = [];
    try {
    content.push(`Persönliche Informationen`);
    content.push(`Nachname:\t\t${formData.lastName}`);
    content.push(`Vorname:\t\t${formData.firstName}`);
    // Calculate age in years from birthday
    const birthdayDateFormat = formatDate(formData.birthday);
    const age = calculateAge(formData.birthday);
    content.push(`Geburtstag:\t\t${birthdayDateFormat} (${age} Jahre)`); // In Klammern das Alter in Jahre

    content.push(`Familienstand:\t${formData.marital}`);
    content.push(`Staatsangehörigkeit:\t${formData.nationality}`);
    content.push(`Konfession:\t${formData.confession}`);
    content.push(`Sozial-Vers.-Nr.:\t${formData.ssn}`);


    content.push('\nKontaktinformationen');
    content.push(`Mail:\t\t${formData.mail}`);
    content.push(`Telefon:\t${formData.phone}`);

    content.push('\nAdresse');
    content.push(`Straße:\t${formData.street}`);
    content.push(`PLZ:\t${formData.zip}`);
    content.push(`Stadt:\t${formData.city}`);

    content.push('\nBerufsbezogen');
    content.push(`Aktuelle Anstellung:\t${formData.currentEmployment}`);
    content.push(`Sonstige Bezüge:\t${formData.earnings}`);
    content.push(`Gewünschte Anstellung:\t${formData.desiredEmployment}`);
    content.push(`Wunschgehalt:\t\t\t${formData.salary} €`);
    content.push(`Möglicher Beginn:\t\t${formatDate(formData.entry)}`);
    content.push(`Erfahrung:\n${formData.experience}`);
    content.push('\nVerfügbarkeit');
    // Construct availability matrix
    let daysStr = 'Beginn\t'
    for (const day of days) {
        daysStr += `${day.substring(0, 2)}\t`
    }
    content.push(daysStr)
    let str = "";
    let daysArr = []
    days.forEach((day, dayIndex) => {
        // Access the availability for the current shift on the current day
        let availabilityElement = formData.availability[day];
        daysArr.push(availabilityElement)
    });
    shifts.forEach((shift, idx) => {
        str += `${shift}\t`
        daysArr.forEach((day, dayIdx) => {
            str += `${day[idx] ? 'J' : 'N'}\t`
        })
        str += "\n"
    })
    content.push(`${str}`);
    content.push(`\nMotivation:\n${formData.motivation}`);
    } catch (e) {
        return null;
    }
    return content.join('\n'); // Return the entire content as a single string
}

export function prepareDataHTML(formData) {
    let content = [];

    try {
        content.push(`<h2>Persönliche Informationen</h2>`);
        content.push(`<p><strong>Vorname:</strong> ${formData.firstName}</p>`);
        content.push(`<p><strong>Nachname:</strong> ${formData.lastName}</p>`);
        // Calculate age in years from birthday
        const birthdayDateFormat = formatDate(formData.birthday);
        const age = calculateAge(formData.birthday);
        content.push(`<p><strong>Geburtstag:</strong> ${birthdayDateFormat} (${age} Jahre)</p>`); // In Klammern das Alter in Jahre
        content.push(`<p><strong>Familienstand:</strong> ${formData.marital}</p>`);
        content.push(`<p><strong>Staatsangehörigkeit:</strong> ${formData.nationality}</p>`);
        content.push(`<p><strong>Konfession:</strong> ${formData.confession}</p>`);
        content.push(`<p><strong>Soz.-Vers.-Nr:</strong> ${formData.ssn}</p>`);

        content.push(`<h2>Kontaktinformationen</h2>`);
        content.push(`<p><strong>Mail:</strong> ${formData.mail}</p>`);
        content.push(`<p><strong>Telefon:</strong> ${formData.phone}</p>`);

        content.push(`<h2>Adresse</h2>`);
        content.push(`<p><strong>Straße:</strong> ${formData.street}</p>`);
        content.push(`<p><strong>PLZ:</strong> ${formData.zip}</p>`);
        content.push(`<p><strong>Stadt:</strong> ${formData.city}</p>`);

        content.push(`<h2>Über</h2>`);
        content.push(`<p><strong>Aktuelle Anstellung:</strong> ${formData.currentEmployment}</p>`);
        content.push(`<p><strong>Gewünschte Anstellung:</strong> ${formData.desiredEmployment}</p>`);
        content.push(`<p><strong>Wunschgehalt:</strong> ${formData.salary} €</p>`);
        content.push(`<p><strong>Andere Bezüge:</strong> ${formData.earnings}</p>`);
        content.push(`<p><strong>Möglicher Beginn:</strong> ${formatDate(formData.entry)}</p>`);
        content.push(`<p><strong>Erfahrung:</strong><br>${formData.experience}</p>`);

        content.push(`<h2>Verfügbarkeit</h2>`);
        content.push(`<table style="border-collapse: collapse; width: 100%;">`);
        content.push(`<tr><th style="border: 1px solid black; padding: 8px;">&nbsp;</th>`);
        for (const day of days) {
            content.push(`<th style="border: 1px solid black; padding: 8px;">${day}</th>`);
        }
        content.push(`</tr>`);
        shifts.forEach((shift, idx) => {
            content.push(`<tr>`);
            content.push(`<td style="border: 1px solid black; padding: 8px;">${shift}</td>`);
            days.forEach((day) => {
                let available = formData.availability[day][idx] ? 'Ja' : 'Nein';
                content.push(`<td style="border: 1px solid black; padding: 8px;">${available}</td>`);
            });
            content.push(`</tr>`);
        });
        content.push(`</table>`);


        content.push(`<h2>Motivation</h2>`);
        content.push(`<p>${formData.motivation}</p>`);
    } catch (e) {
        return null;
    }

    return content.join(''); // Return the entire content as a single HTML string
}


function calculateAge(date) {
    const birthday = new Date(date);
    return `${new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970}`;
}

function formatDate(date) {
    const entryDate = new Date(date);
    return `${entryDate.getDate()}. ${entryDate.toLocaleString('de-DE', {month: 'long'})} ${entryDate.getFullYear()}`;
}

