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

export const maxWidthMobile = 768
export const minWidthNonMobile = maxWidthMobile + 1
export const maxWidthTablet = 1024

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
    return content.join('\n'); // Return the entire content as a single string
}

export function prepareDataHTML(formData) {
    let content = [];
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

export const legalArray = [
    {
        title: 'IMPRESSUM',
        content: <><h1>Impressum</h1>

            <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
            <p>Max Mustermann<br/>
                Musterladen<br/>
                Musterstra&szlig;e 111<br/>
                Geb&auml;ude 44<br/>
                90210 Musterstadt</p>

            <h2>Kontakt</h2>
            <p>Telefon: +49 (0) 123 44 55 66<br/>
                Telefax: +49 (0) 123 44 55 99<br/>
                E-Mail: mustermann@musterfirma.de</p>

            <h2>Aufsichtsbeh&ouml;rde</h2>
            <p>Kassen&auml;rztliche Vereinigung Hessen<br/>
                Europa-Allee 90<br/>
                60486 Frankfurt am Main</p>
            <p><a href="https://www.kvhessen.de/" target="_blank"
                  rel="noopener noreferrer">https://www.kvhessen.de/</a></p>

            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>Berufsbezeichnung:<br/>
                Psychotherapeutisch t&auml;tige &Auml;rztin, Supervisorin, Balintgruppen-Leiterin</p>
            <p>Zust&auml;ndige Kammer:<br/>
                Landes&auml;rztekammer Hessen<br/>
                Hanauer Landstra&szlig;e 152<br/>
                60314 Frankfurt</p>
            <p>Verliehen in:<br/>
                Deutschland</p>
            <p>Es gelten folgende berufsrechtliche Regelungen:</p>
            <h2>Angaben zur Berufs&shy;haftpflicht&shy;versicherung</h2>
            <p><strong>Name und Sitz des Versicherers:</strong><br/>
                [NAME und ADRESSE BERUFSHAFTPFLICHT]</p>
            <p><strong>Geltungsraum der Versicherung:</strong><br/>Deutschland</p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.</p>

            <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p></>
    },
    {
        title: 'PRIVACY',
        content: <div><h1>Datenschutz&shy;erkl&auml;rung</h1>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3> <p>Die folgenden Hinweise geben einen einfachen &Uuml;berblick
                dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
                Personenbezogene Daten sind alle Daten, mit denen Sie pers&ouml;nlich identifiziert werden
                k&ouml;nnen. Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter
                diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.</p>
            <h3>Datenerfassung auf dieser Website</h3> <h4>Wer ist verantwortlich f&uuml;r die Datenerfassung auf
                dieser Website?</h4> <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt &bdquo;Hinweis zur Verantwortlichen
                Stelle&ldquo; in dieser Datenschutzerkl&auml;rung entnehmen.</p> <h4>Wie erfassen wir Ihre
                Daten?</h4> <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
                kann es sich z.&nbsp;B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p> <p>Andere
                Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                IT-Systeme erfasst. Das sind vor allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem
                oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese
                Website betreten.</p> <h4>Wof&uuml;r nutzen wir Ihre Daten?</h4> <p>Ein Teil der Daten wird erhoben,
                um eine fehlerfreie Bereitstellung der Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur
                Analyse Ihres Nutzerverhaltens verwendet werden.</p> <h4>Welche Rechte haben Sie bez&uuml;glich
                Ihrer Daten?</h4> <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft,
                Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben
                au&szlig;erdem ein Recht, die Berichtigung oder L&ouml;schung dieser Daten zu verlangen. Wenn Sie
                eine Einwilligung zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung jederzeit
                f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das Recht, unter bestimmten Umst&auml;nden
                die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren
                steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde zu.</p> <p>Hierzu
                sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie sich jederzeit an uns wenden.</p>
            <h3>Analyse-Tools und Tools von Dritt&shy;anbietern</h3> <p>Beim Besuch dieser Website kann Ihr
                Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten
                Analyseprogrammen.</p> <p>Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der
                folgenden Datenschutzerkl&auml;rung.</p>
            <h2>2. Hosting</h2>
            <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
            <h3>Host Europe</h3> <p>Anbieter ist die Host Europe GmbH, Hansestra&szlig;e 111, 51149, K&ouml;ln
                (nachfolgend Host Europe) Wenn Sie unsere Website besuchen, erfasst Host Europe verschiedene
                Logfiles inklusive Ihrer IP-Adressen.</p> <p>Details entnehmen Sie der Datenschutzerkl&auml;rung von
                Host Europe: <a href="https://www.hosteurope.de/AGB/Datenschutzerklaerung/" target="_blank"
                                rel="noopener noreferrer">https://www.hosteurope.de/AGB/Datenschutzerklaerung/</a>.
            </p> <p>Die Verwendung von Host Europe erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben
                ein berechtigtes Interesse an einer m&ouml;glichst zuverl&auml;ssigen Darstellung unserer Website.
                Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
                ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und &sect; 25 Abs. 1 TTDSG, soweit
                die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endger&auml;t des
                Nutzers (z.&nbsp;B. f&uuml;r Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist
                jederzeit widerrufbar.</p>
            <h4>Auftragsverarbeitung</h4> <p>Wir haben einen Vertrag &uuml;ber Auftragsverarbeitung (AVV) zur
                Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen
                datenschutzrechtlich vorgeschriebenen Vertrag, der gew&auml;hrleistet, dass dieser die
                personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
                DSGVO verarbeitet.</p>
            <h2>3. Allgemeine Hinweise und Pflicht&shy;informationen</h2>
            <h3>Datenschutz</h3> <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr
                ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Wenn Sie diese Website
                benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit
                denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende
                Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und wof&uuml;r wir sie nutzen.
                Sie erl&auml;utert auch, wie und zu welchem Zweck das geschieht.</p> <p>Wir weisen darauf hin, dass
                die Daten&uuml;bertragung im Internet (z.&nbsp;B. bei der Kommunikation per E-Mail)
                Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch
                Dritte ist nicht m&ouml;glich.</p>
            <h3>Hinweis zur verantwortlichen Stelle</h3> <p>Die verantwortliche Stelle f&uuml;r die
                Datenverarbeitung auf dieser Website ist:</p> <p>Beispielfirma<br/>
                Musterweg 10<br/>
                90210 Musterstadt</p>

            <p>Telefon: +49 (0) 123 44 55 66<br/>
                E-Mail: info@beispielfirma.de</p>
            <p>Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person, die allein oder gemeinsam mit
                anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B.
                Namen, E-Mail-Adressen o. &Auml;.) entscheidet.</p>

            <h3>Speicherdauer</h3> <p>Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
                Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck f&uuml;r
                die Datenverarbeitung entf&auml;llt. Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen
                oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht, sofern wir
                keine anderen rechtlich zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen
                Daten haben (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
                erfolgt die L&ouml;schung nach Fortfall dieser Gr&uuml;nde.</p>
            <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3> <p>Sofern
                Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
                Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdr&uuml;cklichen
                Einwilligung in die &Uuml;bertragung personenbezogener Daten in Drittstaaten erfolgt die
                Datenverarbeitung au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
                Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endger&auml;t (z.&nbsp;B. via
                Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zus&auml;tzlich auf
                Grundlage von &sect; 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten
                zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich,
                verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten
                wir Ihre Daten, sofern diese zur Erf&uuml;llung einer rechtlichen Verpflichtung erforderlich sind
                auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage
                unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. &Uuml;ber die jeweils im
                Einzelfall einschl&auml;gigen Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser
                Datenschutzerkl&auml;rung informiert.</p>
            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3> <p>Viele Datenverarbeitungsvorg&auml;nge sind
                nur mit Ihrer ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine bereits erteilte
                Einwilligung jederzeit widerrufen. Die Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
                Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.</p>
            <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen sowie gegen Direktwerbung (Art.
                21 DSGVO)</h3> <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO
                ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH AUS IHRER BESONDEREN SITUATION
                ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH
                F&Uuml;R EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF
                DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH
                EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN,
                WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE
                IHRE INTERESSEN, RECHTE UND FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER
                GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21
                ABS. 1 DSGVO).</p> <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
                BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER
                PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS
                PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN
                IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET
                (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
            <h3>Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde</h3> <p>Im Falle von
                Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres
                Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das Beschwerderecht besteht
                unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
            <h3>Recht auf Daten&shy;&uuml;bertrag&shy;barkeit</h3> <p>Sie haben das Recht, Daten, die wir auf
                Grundlage Ihrer Einwilligung oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an
                sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format aush&auml;ndigen zu
                lassen. Sofern Sie die direkte &Uuml;bertragung der Daten an einen anderen Verantwortlichen
                verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
            <h3>Auskunft, L&ouml;schung und Berichtigung</h3> <p>Sie haben im Rahmen der geltenden gesetzlichen
                Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten
                personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung und
                ggf. ein Recht auf Berichtigung oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum
                Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.</p>
            <h3>Recht auf Einschr&auml;nkung der Verarbeitung</h3> <p>Sie haben das Recht, die Einschr&auml;nkung
                der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich jederzeit
                an uns wenden. Das Recht auf Einschr&auml;nkung der Verarbeitung besteht in folgenden
                F&auml;llen:</p>
            <ul>
                <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                    ben&ouml;tigen wir in der Regel Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer der
                    Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                </li>
                <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtm&auml;&szlig;ig geschah/geschieht,
                    k&ouml;nnen Sie statt der L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.
                </li>
                <li>Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie sie jedoch zur
                    Aus&uuml;bung, Verteidigung oder Geltendmachung von Rechtsanspr&uuml;chen ben&ouml;tigen, haben
                    Sie das Recht, statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                </li>
                <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abw&auml;gung
                    zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen
                    Interessen &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.
                </li>
            </ul>
            <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschr&auml;nkt haben, d&uuml;rfen diese
                Daten &ndash; von ihrer Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
                Geltendmachung, Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen oder zum Schutz der Rechte
                einer anderen nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines
                wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder eines Mitgliedstaats
                verarbeitet werden.</p>
            <h3>SSL- bzw. TLS-Verschl&uuml;sselung</h3> <p>Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum
                Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die
                Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschl&uuml;sselung. Eine
                verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers
                von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
                Browserzeile.</p> <p>Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die
                Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen werden.</p>
            <h3>Widerspruch gegen Werbe-E-Mails</h3> <p>Der Nutzung von im Rahmen der Impressumspflicht
                ver&ouml;ffentlichten Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich angeforderter
                Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten
                sich ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten Zusendung von
                Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>
            <h2>4. Datenerfassung auf dieser Website</h2>
            <h3>Cookies</h3> <p>Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies sind
                kleine Datenpakete und richten auf Ihrem Endger&auml;t keinen Schaden an. Sie werden entweder
                vor&uuml;bergehend f&uuml;r die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente
                Cookies) auf Ihrem Endger&auml;t gespeichert. Session-Cookies werden nach Ende Ihres Besuchs
                automatisch gel&ouml;scht. Permanente Cookies bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie
                diese selbst l&ouml;schen oder eine automatische L&ouml;schung durch Ihren Webbrowser erfolgt.</p>
            <p>Cookies k&ouml;nnen von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog.
                Third-Party-Cookies). Third-Party-Cookies erm&ouml;glichen die Einbindung bestimmter
                Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z.&nbsp;B. Cookies zur Abwicklung von
                Zahlungsdienstleistungen).</p> <p>Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind
                technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren w&uuml;rden
                (z.&nbsp;B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies k&ouml;nnen zur
                Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.</p> <p>Cookies, die zur
                Durchf&uuml;hrung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von
                Ihnen erw&uuml;nschter Funktionen (z.&nbsp;B. f&uuml;r die Warenkorbfunktion) oder zur Optimierung
                der Website (z.&nbsp;B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige
                Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere
                Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der
                Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner
                Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren
                Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschlie&szlig;lich auf
                Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und &sect; 25 Abs. 1 TTDSG); die
                Einwilligung ist jederzeit widerrufbar.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass
                Sie &uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die
                Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das
                automatische L&ouml;schen der Cookies beim Schlie&szlig;en des Browsers aktivieren. Bei der
                Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p>
            <p>Welche Cookies und Dienste auf dieser Website eingesetzt werden, k&ouml;nnen Sie dieser
                Datenschutzerkl&auml;rung entnehmen.</p>
            <h3>Server-Log-Dateien</h3> <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in
                so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns &uuml;bermittelt. Dies sind:</p>
            <ul>
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
            </ul>
            <p>Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p> <p>Die
                Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner
                Website &ndash; hierzu m&uuml;ssen die Server-Log-Files erfasst werden.</p>
            <h3>Kontaktformular</h3> <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
                Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
                Bearbeitung der Anfrage und f&uuml;r den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
                geben wir nicht ohne Ihre Einwilligung weiter.</p> <p>Die Verarbeitung dieser Daten erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags
                zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich ist. In
                allen &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem berechtigten Interesse an der
                effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist
                jederzeit widerrufbar.</p> <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
                uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
                Zweck f&uuml;r die Datenspeicherung entf&auml;llt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer
                Anfrage). Zwingende gesetzliche Bestimmungen &ndash; insbesondere
                Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.</p>
            <h3>Anfrage per E-Mail, Telefon oder Telefax</h3> <p>Wenn Sie uns per E-Mail, Telefon oder Telefax
                kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name,
                Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten
                geben wir nicht ohne Ihre Einwilligung weiter.</p> <p>Die Verarbeitung dieser Daten erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags
                zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich ist. In
                allen &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem berechtigten Interesse an der
                effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist
                jederzeit widerrufbar.</p> <p>Die von Ihnen an uns per Kontaktanfragen &uuml;bersandten Daten
                verbleiben bei uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur Speicherung
                widerrufen oder der Zweck f&uuml;r die Datenspeicherung entf&auml;llt (z.&nbsp;B. nach
                abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche
                Bestimmungen &ndash; insbesondere gesetzliche Aufbewahrungsfristen &ndash; bleiben
                unber&uuml;hrt.</p>
            <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p></div>,
    },
]

export const allTimeZone = [{
    Name: 'Afghanistan',
    Code: 'AF',
    Timezone: 'Afghanistan Standard Time',
    UTC: 'UTC+04:30',
    MobileCode: '+93'
}, {
    Name: 'Åland Islands',
    Code: 'AX',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+358-18'
}, {
    Name: 'Albania',
    Code: 'AL',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+355'
}, {
    Name: 'Algeria',
    Code: 'DZ',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+213'
}, {Name: 'American Samoa', Code: 'AS', Timezone: 'UTC-11', UTC: 'UTC-11:00', MobileCode: '+1-684'}, {
    Name: 'Andorra',
    Code: 'AD',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+376'
}, {
    Name: 'Angola',
    Code: 'AO',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+244'
}, {
    Name: 'Anguilla',
    Code: 'AI',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-264'
}, {
    Name: 'Antarctica',
    Code: 'AQ',
    Timezone: 'Pacific SA Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+'
}, {
    Name: 'Antigua and Barbuda',
    Code: 'AG',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-268'
}, {
    Name: 'Argentina',
    Code: 'AR',
    Timezone: 'Argentina Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+54'
}, {
    Name: 'Armenia',
    Code: 'AM',
    Timezone: 'Caucasus Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+374'
}, {
    Name: 'Aruba',
    Code: 'AW',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+297'
}, {
    Name: 'Australia',
    Code: 'AU',
    Timezone: 'AUS Eastern Standard Time',
    UTC: 'UTC+10:00',
    MobileCode: '+61'
}, {
    Name: 'Austria',
    Code: 'AT',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+43'
}, {
    Name: 'Azerbaijan',
    Code: 'AZ',
    Timezone: 'Azerbaijan Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+994'
}, {
    Name: 'Bahamas, The',
    Code: 'BS',
    Timezone: 'Eastern Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+1-242'
}, {
    Name: 'Bahrain',
    Code: 'BH',
    Timezone: 'Arab Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+973'
}, {
    Name: 'Bangladesh',
    Code: 'BD',
    Timezone: 'Bangladesh Standard Time',
    UTC: 'UTC+06:00',
    MobileCode: '+880'
}, {
    Name: 'Barbados',
    Code: 'BB',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-246'
}, {
    Name: 'Belarus',
    Code: 'BY',
    Timezone: 'Belarus Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+375'
}, {
    Name: 'Belgium',
    Code: 'BE',
    Timezone: 'Romance Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+32'
}, {
    Name: 'Belize',
    Code: 'BZ',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+501'
}, {
    Name: 'Benin',
    Code: 'BJ',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+229'
}, {
    Name: 'Bermuda',
    Code: 'BM',
    Timezone: 'Atlantic Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-441'
}, {
    Name: 'Bhutan',
    Code: 'BT',
    Timezone: 'Bangladesh Standard Time',
    UTC: 'UTC+06:00',
    MobileCode: '+975'
}, {
    Name: 'Bolivarian Republic of Venezuela',
    Code: 'VE',
    Timezone: 'Venezuela Standard Time',
    UTC: 'UTC-04:30',
    MobileCode: '+58'
}, {
    Name: 'Bolivia',
    Code: 'BO',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+591'
}, {
    Name: 'Bonaire, Sint Eustatius and Saba',
    Code: 'BQ',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+599'
}, {
    Name: 'Bosnia and Herzegovina',
    Code: 'BA',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+387'
}, {
    Name: 'Botswana',
    Code: 'BW',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+267'
}, {Name: 'Bouvet Island', Code: 'BV', Timezone: 'UTC', UTC: 'UTC', MobileCode: '+'}, {
    Name: 'Brazil',
    Code: 'BR',
    Timezone: 'E. South America Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+55'
}, {
    Name: 'British Indian Ocean Territory',
    Code: 'IO',
    Timezone: 'Central Asia Standard Time',
    UTC: 'UTC+06:00',
    MobileCode: '+246'
}, {
    Name: 'Brunei',
    Code: 'BN',
    Timezone: 'Singapore Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+673'
}, {
    Name: 'Bulgaria',
    Code: 'BG',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+359'
}, {
    Name: 'Burkina Faso',
    Code: 'BF',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+226'
}, {
    Name: 'Burundi',
    Code: 'BI',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+257'
}, {
    Name: 'Cabo Verde',
    Code: 'CV',
    Timezone: 'Cape Verde Standard Time',
    UTC: 'UTC-01:00',
    MobileCode: '+238'
}, {
    Name: 'Cambodia',
    Code: 'KH',
    Timezone: 'SE Asia Standard Time',
    UTC: 'UTC+07:00',
    MobileCode: '+855'
}, {
    Name: 'Cameroon',
    Code: 'CM',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+237'
}, {
    Name: 'Canada',
    Code: 'CA',
    Timezone: 'Eastern Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+1'
}, {
    Name: 'Cayman Islands',
    Code: 'KY',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+1-345'
}, {
    Name: 'Central African Republic',
    Code: 'CF',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+236'
}, {
    Name: 'Chad',
    Code: 'TD',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+235'
}, {
    Name: 'Chile',
    Code: 'CL',
    Timezone: 'Pacific SA Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+56'
}, {
    Name: 'China',
    Code: 'CN',
    Timezone: 'China Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+86'
}, {
    Name: 'Christmas Island',
    Code: 'CX',
    Timezone: 'SE Asia Standard Time',
    UTC: 'UTC+07:00',
    MobileCode: '+61'
}, {
    Name: 'Cocos (Keeling) Islands',
    Code: 'CC',
    Timezone: 'Myanmar Standard Time',
    UTC: 'UTC+06:30',
    MobileCode: '+61'
}, {
    Name: 'Colombia',
    Code: 'CO',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+57'
}, {
    Name: 'Comoros',
    Code: 'KM',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+269'
}, {
    Name: 'Congo',
    Code: 'CG',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+242'
}, {
    Name: 'Congo (DRC)',
    Code: 'CD',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+243'
}, {
    Name: 'Cook Islands',
    Code: 'CK',
    Timezone: 'Hawaiian Standard Time',
    UTC: 'UTC-10:00',
    MobileCode: '+682'
}, {
    Name: 'Costa Rica',
    Code: 'CR',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+506'
}, {
    Name: "Côte d'Ivoire",
    Code: 'CI',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+225'
}, {
    Name: 'Croatia',
    Code: 'HR',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+385'
}, {Name: 'Cuba', Code: 'CU', Timezone: 'Eastern Standard Time', UTC: 'UTC-05:00', MobileCode: '+53'}, {
    Name: 'Curaçao',
    Code: 'CW',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+599'
}, {
    Name: 'Cyprus',
    Code: 'CY',
    Timezone: 'E. Europe Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+357'
}, {
    Name: 'Czech Republic',
    Code: 'CZ',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+420'
}, {
    Name: 'Democratic Republic of Timor-Leste',
    Code: 'TL',
    Timezone: 'Tokyo Standard Time',
    UTC: 'UTC+09:00',
    MobileCode: '+670'
}, {
    Name: 'Denmark',
    Code: 'DK',
    Timezone: 'Romance Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+45'
}, {
    Name: 'Djibouti',
    Code: 'DJ',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+253'
}, {
    Name: 'Dominica',
    Code: 'DM',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-767'
}, {
    Name: 'Dominican Republic',
    Code: 'DO',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-809 and 1-829'
}, {
    Name: 'Ecuador',
    Code: 'EC',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+593'
}, {
    Name: 'Egypt',
    Code: 'EG',
    Timezone: 'Egypt Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+20'
}, {
    Name: 'El Salvador',
    Code: 'SV',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+503'
}, {
    Name: 'Equatorial Guinea',
    Code: 'GQ',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+240'
}, {
    Name: 'Eritrea',
    Code: 'ER',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+291'
}, {
    Name: 'Estonia',
    Code: 'EE',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+372'
}, {
    Name: 'Ethiopia',
    Code: 'ET',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+251'
}, {
    Name: 'Falkland Islands (Islas Malvinas)',
    Code: 'FK',
    Timezone: 'SA Eastern Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+500'
}, {
    Name: 'Faroe Islands',
    Code: 'FO',
    Timezone: 'GMT Standard Time',
    UTC: 'UTC',
    MobileCode: '+298'
}, {
    Name: 'Fiji Islands',
    Code: 'FJ',
    Timezone: 'Fiji Standard Time',
    UTC: 'UTC+12:00',
    MobileCode: '+679'
}, {Name: 'Finland', Code: 'FI', Timezone: 'FLE Standard Time', UTC: 'UTC+02:00', MobileCode: '+358'}, {
    Name: 'France',
    Code: 'FR',
    Timezone: 'Romance Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+33'
}, {
    Name: 'French Guiana',
    Code: 'GF',
    Timezone: 'SA Eastern Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+594'
}, {
    Name: 'French Polynesia',
    Code: 'PF',
    Timezone: 'Hawaiian Standard Time',
    UTC: 'UTC-10:00',
    MobileCode: '+689'
}, {
    Name: 'French Southern and Antarctic Lands',
    Code: 'TF',
    Timezone: 'West Asia Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+'
}, {
    Name: 'Gabon',
    Code: 'GA',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+241'
}, {
    Name: 'Gambia, The',
    Code: 'GM',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+220'
}, {
    Name: 'Georgia',
    Code: 'GE',
    Timezone: 'Georgian Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+995'
}, {
    Name: 'Germany',
    Code: 'DE',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+49'
}, {Name: 'Ghana', Code: 'GH', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+233'}, {
    Name: 'Gibraltar',
    Code: 'GI',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+350'
}, {Name: 'Greece', Code: 'GR', Timezone: 'GTB Standard Time', UTC: 'UTC+02:00', MobileCode: '+30'}, {
    Name: 'Greenland',
    Code: 'GL',
    Timezone: 'Greenland Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+299'
}, {
    Name: 'Grenada',
    Code: 'GD',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-473'
}, {
    Name: 'Guadeloupe',
    Code: 'GP',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+590'
}, {
    Name: 'Guam',
    Code: 'GU',
    Timezone: 'West Pacific Standard Time',
    UTC: 'UTC+10:00',
    MobileCode: '+1-671'
}, {
    Name: 'Guatemala',
    Code: 'GT',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+502'
}, {Name: 'Guernsey', Code: 'GG', Timezone: 'GMT Standard Time', UTC: 'UTC', MobileCode: '+44-1481'}, {
    Name: 'Guinea',
    Code: 'GN',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+224'
}, {
    Name: 'Guinea-Bissau',
    Code: 'GW',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+245'
}, {
    Name: 'Guyana',
    Code: 'GY',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+592'
}, {
    Name: 'Haiti',
    Code: 'HT',
    Timezone: 'Eastern Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+509'
}, {
    Name: 'Heard Island and McDonald Islands',
    Code: 'HM',
    Timezone: 'Mauritius Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+ '
}, {
    Name: 'Honduras',
    Code: 'HN',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+504'
}, {
    Name: 'Hong Kong SAR',
    Code: 'HK',
    Timezone: 'China Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+852'
}, {
    Name: 'Hungary',
    Code: 'HU',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+36'
}, {Name: 'Iceland', Code: 'IS', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+354'}, {
    Name: 'India',
    Code: 'IN',
    Timezone: 'India Standard Time',
    UTC: 'UTC+05:30',
    MobileCode: '+91'
}, {
    Name: 'Indonesia',
    Code: 'ID',
    Timezone: 'SE Asia Standard Time',
    UTC: 'UTC+07:00',
    MobileCode: '+62'
}, {Name: 'Iran', Code: 'IR', Timezone: 'Iran Standard Time', UTC: 'UTC+03:30', MobileCode: '+98'}, {
    Name: 'Iraq',
    Code: 'IQ',
    Timezone: 'Arabic Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+964'
}, {Name: 'Ireland', Code: 'IE', Timezone: 'GMT Standard Time', UTC: 'UTC', MobileCode: '+353'}, {
    Name: 'Israel',
    Code: 'IL',
    Timezone: 'Israel Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+972'
}, {
    Name: 'Italy',
    Code: 'IT',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+39'
}, {
    Name: 'Jamaica',
    Code: 'JM',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+1-876'
}, {
    Name: 'Jan Mayen',
    Code: 'SJ',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+47'
}, {Name: 'Japan', Code: 'JP', Timezone: 'Tokyo Standard Time', UTC: 'UTC+09:00', MobileCode: '+81'}, {
    Name: 'Jersey',
    Code: 'JE',
    Timezone: 'GMT Standard Time',
    UTC: 'UTC',
    MobileCode: '+44-1534'
}, {
    Name: 'Jordan',
    Code: 'JO',
    Timezone: 'Jordan Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+962'
}, {
    Name: 'Kazakhstan',
    Code: 'KZ',
    Timezone: 'Central Asia Standard Time',
    UTC: 'UTC+06:00',
    MobileCode: '+7'
}, {
    Name: 'Kenya',
    Code: 'KE',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+254'
}, {Name: 'Kiribati', Code: 'KI', Timezone: 'UTC+12', UTC: 'UTC+12:00', MobileCode: '+686'}, {
    Name: 'Korea',
    Code: 'KR',
    Timezone: 'Korea Standard Time',
    UTC: 'UTC+09:00',
    MobileCode: '+82'
}, {
    Name: 'Kosovo',
    Code: 'XK',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+'
}, {
    Name: 'Kuwait',
    Code: 'KW',
    Timezone: 'Arab Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+965'
}, {
    Name: 'Kyrgyzstan',
    Code: 'KG',
    Timezone: 'Central Asia Standard Time',
    UTC: 'UTC+06:00',
    MobileCode: '+996'
}, {Name: 'Laos', Code: 'LA', Timezone: 'SE Asia Standard Time', UTC: 'UTC+07:00', MobileCode: '+856'}, {
    Name: 'Latvia',
    Code: 'LV',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+371'
}, {
    Name: 'Lebanon',
    Code: 'LB',
    Timezone: 'Middle East Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+961'
}, {
    Name: 'Lesotho',
    Code: 'LS',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+266'
}, {Name: 'Liberia', Code: 'LR', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+231'}, {
    Name: 'Libya',
    Code: 'LY',
    Timezone: 'E. Europe Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+218'
}, {
    Name: 'Liechtenstein',
    Code: 'LI',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+423'
}, {
    Name: 'Lithuania',
    Code: 'LT',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+370'
}, {
    Name: 'Luxembourg',
    Code: 'LU',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+352'
}, {
    Name: 'Macao SAR',
    Code: 'MO',
    Timezone: 'China Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+853'
}, {
    Name: 'Macedonia, Former Yugoslav Republic of',
    Code: 'MK',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+389'
}, {
    Name: 'Madagascar',
    Code: 'MG',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+261'
}, {
    Name: 'Malawi',
    Code: 'MW',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+265'
}, {
    Name: 'Malaysia',
    Code: 'MY',
    Timezone: 'Singapore Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+60'
}, {
    Name: 'Maldives',
    Code: 'MV',
    Timezone: 'West Asia Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+960'
}, {Name: 'Mali', Code: 'ML', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+223'}, {
    Name: 'Malta',
    Code: 'MT',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+356'
}, {
    Name: 'Man, Isle of',
    Code: 'IM',
    Timezone: 'GMT Standard Time',
    UTC: 'UTC',
    MobileCode: '+44-1624'
}, {
    Name: 'Marshall Islands',
    Code: 'MH',
    Timezone: 'UTC+12',
    UTC: 'UTC+12:00',
    MobileCode: '+692'
}, {
    Name: 'Martinique',
    Code: 'MQ',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+596'
}, {
    Name: 'Mauritania',
    Code: 'MR',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+222'
}, {
    Name: 'Mauritius',
    Code: 'MU',
    Timezone: 'Mauritius Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+230'
}, {
    Name: 'Mayotte',
    Code: 'YT',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+262'
}, {
    Name: 'Mexico',
    Code: 'MX',
    Timezone: 'Central Standard Time (Mexico)',
    UTC: 'UTC-06:00',
    MobileCode: '+52'
}, {
    Name: 'Micronesia',
    Code: 'FM',
    Timezone: 'West Pacific Standard Time',
    UTC: 'UTC+10:00',
    MobileCode: '+691'
}, {Name: 'Moldova', Code: 'MD', Timezone: 'GTB Standard Time', UTC: 'UTC+02:00', MobileCode: '+373'}, {
    Name: 'Monaco',
    Code: 'MC',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+377'
}, {
    Name: 'Mongolia',
    Code: 'MN',
    Timezone: 'Ulaanbaatar Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+976'
}, {
    Name: 'Montenegro',
    Code: 'ME',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+382'
}, {
    Name: 'Montserrat',
    Code: 'MS',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-664'
}, {
    Name: 'Morocco',
    Code: 'MA',
    Timezone: 'Morocco Standard Time',
    UTC: 'UTC',
    MobileCode: '+212'
}, {
    Name: 'Mozambique',
    Code: 'MZ',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+258'
}, {
    Name: 'Myanmar',
    Code: 'MM',
    Timezone: 'Myanmar Standard Time',
    UTC: 'UTC+06:30',
    MobileCode: '+95'
}, {
    Name: 'Namibia',
    Code: 'NA',
    Timezone: 'Namibia Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+264'
}, {Name: 'Nauru', Code: 'NR', Timezone: 'UTC+12', UTC: 'UTC+12:00', MobileCode: '+674'}, {
    Name: 'Nepal',
    Code: 'NP',
    Timezone: 'Nepal Standard Time',
    UTC: 'UTC+05:45',
    MobileCode: '+977'
}, {
    Name: 'Netherlands',
    Code: 'NL',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+31'
}, {
    Name: 'New Caledonia',
    Code: 'NC',
    Timezone: 'Central Pacific Standard Time',
    UTC: 'UTC+11:00',
    MobileCode: '+687'
}, {
    Name: 'New Zealand',
    Code: 'NZ',
    Timezone: 'New Zealand Standard Time',
    UTC: 'UTC+12:00',
    MobileCode: '+64'
}, {
    Name: 'Nicaragua',
    Code: 'NI',
    Timezone: 'Central America Standard Time',
    UTC: 'UTC-06:00',
    MobileCode: '+505'
}, {
    Name: 'Niger',
    Code: 'NE',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+227'
}, {
    Name: 'Nigeria',
    Code: 'NG',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+234'
}, {Name: 'Niue', Code: 'NU', Timezone: 'UTC-11', UTC: 'UTC-11:00', MobileCode: '+683'}, {
    Name: 'Norfolk Island',
    Code: 'NF',
    Timezone: 'Central Pacific Standard Time',
    UTC: 'UTC+11:00',
    MobileCode: '+672'
}, {
    Name: 'North Korea',
    Code: 'KP',
    Timezone: 'Korea Standard Time',
    UTC: 'UTC+09:00',
    MobileCode: '+850'
}, {
    Name: 'Northern Mariana Islands',
    Code: 'MP',
    Timezone: 'West Pacific Standard Time',
    UTC: 'UTC+10:00',
    MobileCode: '+1-670'
}, {
    Name: 'Norway',
    Code: 'NO',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+47'
}, {
    Name: 'Oman',
    Code: 'OM',
    Timezone: 'Arabian Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+968'
}, {
    Name: 'Pakistan',
    Code: 'PK',
    Timezone: 'Pakistan Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+92'
}, {
    Name: 'Palau',
    Code: 'PW',
    Timezone: 'Tokyo Standard Time',
    UTC: 'UTC+09:00',
    MobileCode: '+680'
}, {
    Name: 'Palestinian Authority',
    Code: 'PS',
    Timezone: 'Egypt Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+970'
}, {
    Name: 'Panama',
    Code: 'PA',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+507'
}, {
    Name: 'Papua New Guinea',
    Code: 'PG',
    Timezone: 'West Pacific Standard Time',
    UTC: 'UTC+10:00',
    MobileCode: '+675'
}, {
    Name: 'Paraguay',
    Code: 'PY',
    Timezone: 'Paraguay Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+595'
}, {
    Name: 'Peru',
    Code: 'PE',
    Timezone: 'SA Pacific Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+51'
}, {
    Name: 'Philippines',
    Code: 'PH',
    Timezone: 'Singapore Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+63'
}, {
    Name: 'Pitcairn Islands',
    Code: 'PN',
    Timezone: 'Pacific Standard Time',
    UTC: 'UTC-08:00',
    MobileCode: '+870'
}, {
    Name: 'Poland',
    Code: 'PL',
    Timezone: 'Central European Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+48'
}, {Name: 'Portugal', Code: 'PT', Timezone: 'GMT Standard Time', UTC: 'UTC', MobileCode: '+351'}, {
    Name: 'Puerto Rico',
    Code: 'PR',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-787 and 1-939'
}, {Name: 'Qatar', Code: 'QA', Timezone: 'Arab Standard Time', UTC: 'UTC+03:00', MobileCode: '+974'}, {
    Name: 'Reunion',
    Code: 'RE',
    Timezone: 'Mauritius Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+262'
}, {Name: 'Romania', Code: 'RO', Timezone: 'GTB Standard Time', UTC: 'UTC+02:00', MobileCode: '+40'}, {
    Name: 'Russia',
    Code: 'RU',
    Timezone: 'Russian Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+7'
}, {
    Name: 'Rwanda',
    Code: 'RW',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+250'
}, {
    Name: 'Saint Barthélemy',
    Code: 'BL',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+590'
}, {
    Name: 'Saint Helena, Ascension and Tristan da Cunha',
    Code: 'SH',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+290'
}, {
    Name: 'Saint Kitts and Nevis',
    Code: 'KN',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-869'
}, {
    Name: 'Saint Lucia',
    Code: 'LC',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-758'
}, {
    Name: 'Saint Martin (French part)',
    Code: 'MF',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+590'
}, {
    Name: 'Saint Pierre and Miquelon',
    Code: 'PM',
    Timezone: 'Greenland Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+508'
}, {
    Name: 'Saint Vincent and the Grenadines',
    Code: 'VC',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-784'
}, {
    Name: 'Samoa',
    Code: 'WS',
    Timezone: 'Samoa Standard Time',
    UTC: 'UTC+13:00',
    MobileCode: '+685'
}, {
    Name: 'San Marino',
    Code: 'SM',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+378'
}, {
    Name: 'São Tomé and Príncipe',
    Code: 'ST',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+239'
}, {
    Name: 'Saudi Arabia',
    Code: 'SA',
    Timezone: 'Arab Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+966'
}, {Name: 'Senegal', Code: 'SN', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+221'}, {
    Name: 'Serbia',
    Code: 'RS',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+381'
}, {
    Name: 'Seychelles',
    Code: 'SC',
    Timezone: 'Mauritius Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+248'
}, {
    Name: 'Sierra Leone',
    Code: 'SL',
    Timezone: 'Greenwich Standard Time',
    UTC: 'UTC',
    MobileCode: '+232'
}, {
    Name: 'Singapore',
    Code: 'SG',
    Timezone: 'Singapore Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+65'
}, {
    Name: 'Sint Maarten (Dutch part)',
    Code: 'SX',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+599'
}, {
    Name: 'Slovakia',
    Code: 'SK',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+421'
}, {
    Name: 'Slovenia',
    Code: 'SI',
    Timezone: 'Central Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+386'
}, {
    Name: 'Solomon Islands',
    Code: 'SB',
    Timezone: 'Central Pacific Standard Time',
    UTC: 'UTC+11:00',
    MobileCode: '+677'
}, {
    Name: 'Somalia',
    Code: 'SO',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+252'
}, {
    Name: 'South Africa',
    Code: 'ZA',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+27'
}, {
    Name: 'South Georgia and the South Sandwich Islands',
    Code: 'GS',
    Timezone: 'UTC-02',
    UTC: 'UTC-02:00',
    MobileCode: '+'
}, {
    Name: 'South Sudan',
    Code: 'SS',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+211'
}, {
    Name: 'Spain',
    Code: 'ES',
    Timezone: 'Romance Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+34'
}, {
    Name: 'Sri Lanka',
    Code: 'LK',
    Timezone: 'Sri Lanka Standard Time',
    UTC: 'UTC+05:30',
    MobileCode: '+94'
}, {
    Name: 'Sudan',
    Code: 'SD',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+249'
}, {
    Name: 'Suriname',
    Code: 'SR',
    Timezone: 'SA Eastern Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+597'
}, {
    Name: 'Svalbard',
    Code: 'SJ',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+47'
}, {
    Name: 'Swaziland',
    Code: 'SZ',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+268'
}, {
    Name: 'Sweden',
    Code: 'SE',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+46'
}, {
    Name: 'Switzerland',
    Code: 'CH',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+41'
}, {Name: 'Syria', Code: 'SY', Timezone: 'Syria Standard Time', UTC: 'UTC+02:00', MobileCode: '+963'}, {
    Name: 'Taiwan',
    Code: 'TW',
    Timezone: 'Taipei Standard Time',
    UTC: 'UTC+08:00',
    MobileCode: '+886'
}, {
    Name: 'Tajikistan',
    Code: 'TJ',
    Timezone: 'West Asia Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+992'
}, {
    Name: 'Tanzania',
    Code: 'TZ',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+255'
}, {
    Name: 'Thailand',
    Code: 'TH',
    Timezone: 'SE Asia Standard Time',
    UTC: 'UTC+07:00',
    MobileCode: '+66'
}, {Name: 'Togo', Code: 'TG', Timezone: 'Greenwich Standard Time', UTC: 'UTC', MobileCode: '+228'}, {
    Name: 'Tokelau',
    Code: 'TK',
    Timezone: 'Tonga Standard Time',
    UTC: 'UTC+13:00',
    MobileCode: '+690'
}, {
    Name: 'Tonga',
    Code: 'TO',
    Timezone: 'Tonga Standard Time',
    UTC: 'UTC+13:00',
    MobileCode: '+676'
}, {
    Name: 'Trinidad and Tobago',
    Code: 'TT',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-868'
}, {
    Name: 'Tunisia',
    Code: 'TN',
    Timezone: 'W. Central Africa Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+216'
}, {
    Name: 'Turkey',
    Code: 'TR',
    Timezone: 'Turkey Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+90'
}, {
    Name: 'Turkmenistan',
    Code: 'TM',
    Timezone: 'West Asia Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+993'
}, {
    Name: 'Turks and Caicos Islands',
    Code: 'TC',
    Timezone: 'Eastern Standard Time',
    UTC: 'UTC-05:00',
    MobileCode: '+1-649'
}, {
    Name: 'Tuvalu',
    Code: 'TV',
    Timezone: 'UTC+12',
    UTC: 'UTC+12:00',
    MobileCode: '+688'
}, {
    Name: 'U.S. Minor Outlying Islands',
    Code: 'UM',
    Timezone: 'UTC-11',
    UTC: 'UTC-11:00',
    MobileCode: '+1'
}, {
    Name: 'Uganda',
    Code: 'UG',
    Timezone: 'E. Africa Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+256'
}, {
    Name: 'Ukraine',
    Code: 'UA',
    Timezone: 'FLE Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+380'
}, {
    Name: 'United Arab Emirates',
    Code: 'AE',
    Timezone: 'Arabian Standard Time',
    UTC: 'UTC+04:00',
    MobileCode: '+971'
}, {
    Name: 'United Kingdom',
    Code: 'GB',
    Timezone: 'GMT Standard Time',
    UTC: 'UTC',
    MobileCode: '+44'
}, {
    Name: 'United States',
    Code: 'US',
    Timezone: 'Pacific Standard Time',
    UTC: 'UTC-08:00',
    MobileCode: '+1'
}, {
    Name: 'Uruguay',
    Code: 'UY',
    Timezone: 'Montevideo Standard Time',
    UTC: 'UTC-03:00',
    MobileCode: '+598'
}, {
    Name: 'Uzbekistan',
    Code: 'UZ',
    Timezone: 'West Asia Standard Time',
    UTC: 'UTC+05:00',
    MobileCode: '+998'
}, {
    Name: 'Vanuatu',
    Code: 'VU',
    Timezone: 'Central Pacific Standard Time',
    UTC: 'UTC+11:00',
    MobileCode: '+678'
}, {
    Name: 'Vatican City',
    Code: 'VA',
    Timezone: 'W. Europe Standard Time',
    UTC: 'UTC+01:00',
    MobileCode: '+379'
}, {
    Name: 'Vietnam',
    Code: 'VN',
    Timezone: 'SE Asia Standard Time',
    UTC: 'UTC+07:00',
    MobileCode: '+84'
}, {
    Name: 'Virgin Islands, U.S.',
    Code: 'VI',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-340'
}, {
    Name: 'Virgin Islands, British',
    Code: 'VG',
    Timezone: 'SA Western Standard Time',
    UTC: 'UTC-04:00',
    MobileCode: '+1-284'
}, {Name: 'Wallis and Futuna', Code: 'WF', Timezone: 'UTC+12', UTC: 'UTC+12:00', MobileCode: '+681'}, {
    Name: 'Yemen',
    Code: 'YE',
    Timezone: 'Arab Standard Time',
    UTC: 'UTC+03:00',
    MobileCode: '+967'
}, {
    Name: 'Zambia',
    Code: 'ZM',
    Timezone: 'South Africa Standard Time',
    UTC: 'UTC+02:00',
    MobileCode: '+260'
}, {Name: 'Zimbabwe', Code: 'ZW', Timezone: 'South Africa Standard Time', UTC: 'UTC+02:00', MobileCode: '+263'}]