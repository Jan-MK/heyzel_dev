const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const shifts = ['Frühschicht', 'Mittagsschicht', 'Spätschicht', 'Abendschicht'];

export function prepareData(formData) {
    let content = [];
    content.push(`Persönliches`);
    content.push(`Vorname:\t\t${formData.firstName}`);
    content.push(`Nachname:\t\t${formData.lastName}`);
    // Calculate age in years from birthday
    const birthdayDateFormat = formatDate(formData.birthday);
    const age = calculateAge(formData.birthday);
    content.push(`Birthday:\t\t${birthdayDateFormat} (${age} Jahre)`); // In Klammern das Alter in Jahre
    content.push(`Nationalität:\t${formData.nationality}`);

    content.push('\nKontaktinformationen');
    content.push(`Mail:\t\t${formData.mail}`);
    content.push(`Telefon:\t${formData.phone}`);

    content.push('\nAdresse');
    content.push(`Straße:\t${formData.street}`);
    content.push(`PLZ:\t${formData.zip}`);
    content.push(`Stadt:\t${formData.city}`);

    content.push('\nÜber');
    content.push(`Aktuelle Anstellung:\t${formData.currentEmployment}`);
    content.push(`Gewünschte Anstellung:\t${formData.desiredEmployment}`);
    content.push(`Wunschgehalt:\t\t\t${formData.salary} €`);
    content.push(`Möglicher Beginn:\t\t${formatDate(formData.entry)}`);
    content.push(`Erfahrung:\n${formData.experience}`);
    content.push('\nVerfügbarkeit');
    // Construct availability matrix
    let daysStr = '\t\t\t\t'
    for (const day of days) {
        daysStr += `${day.substring(0,2)}\t`
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
        str += `${shift}\t${(shift === 'Frühschicht' || shift === 'Spätschicht') ? '\t' : ''}`
        daysArr.forEach((day, dayIdx) => {
            console.log(day[idx], day[idx] === true)
            str += `${day[idx] ? 'J' : 'N'}\t`
        })
        str += "\n"
    })
    console.log(str)
    content.push(`${str}`);
    content.push(`\nMotivation:\n${formData.motivation}`);
    return content.join('\n'); // Return the entire content as a single string
}


function calculateAge(date) {
    const birthday = new Date(date);
    return `${new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970}`;
}

function formatDate(date) {
    const entryDate = new Date(date);
    return `${entryDate.getDate()}. ${entryDate.toLocaleString('de-DE', {month: 'long'})} ${entryDate.getFullYear()}`;
}