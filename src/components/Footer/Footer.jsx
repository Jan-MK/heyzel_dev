import classes from "./Footer.module.scss"
import Logo from "../Logo/Logo.jsx";
import {useState} from "react";
import Modal from "../Modal/Modal.jsx";
import {IoChevronDownOutline, IoChevronUpOutline} from "react-icons/io5";


function Footer(props) {
    const [isMounted, setIsMounted] = useState(false);
    const [currentModalContent, setCurrentModalContent] = useState("");
    const [currentIdx, setCurrentIdx] = useState(-1);

    const year = new Date().getFullYear()

    const legalArray = [
        {
            title: 'IMPRESSUM',
            content: <div className={classes.legalText}><h1>Impressum</h1>

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

                <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p></div>
        },
        {
            title: 'PRIVACY',
            content: <div className={classes.legalText}><h1>Datenschutz&shy;erkl&auml;rung</h1>
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


    function toggleMount(idx) {
        if (!isMounted) {
            setCurrentModalContent(legalArray[idx].content);
            setCurrentIdx(idx);
            setIsMounted(true);
        } else {
            setIsMounted(false);
            setCurrentModalContent("")
        }
    }

    return (
        <>
            <div className={classes.footerWrapper}>
                <div className={classes.topBorder}></div>
                <Logo width={'max(15vw,15vh)'}/>
                <div className={classes.socialNavWrapper}>
                    <h4>Follow us</h4>
                    <nav className={classes.socialNav}>
                        <a href="https://www.instagram.com/heyzelcoffee/" className={classes.socialLink} target="_blank"
                           aria-label="Facebook" rel="noreferrer">
                            <div className={classes.socialLogoWrapper}>
                                {/*<img src={instagram} alt="instagram-logo" className={classes.socialLogo}/>*/}
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 1000 1000" className={classes.socialLogo}>
                                    <path
                                        className={classes.filled}
                                        d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"
                                        transform="translate(-2.5 -2.5)"/>
                                </svg>

                            </div>
                        </a>
                        <a href="https://www.facebook.com/heyzelcoffee/" className={classes.socialLink} target="_blank"
                           aria-label="Facebook" rel="noreferrer">
                            <div className={classes.socialLogoWrapper}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"
                                     className={classes.socialLogo}>
                                    <path className={classes.filled}
                                          d="M500,250C500,111.93,388.07,0,250,0S0,111.93,0,250c0,117.24,80.72,215.62,189.61,242.64v-166.24h-51.55v-76.4h51.55v-32.92c0-85.09,38.51-124.53,122.05-124.53,15.84,0,43.17,3.11,54.35,6.21v69.25c-5.9-.62-16.15-.93-28.88-.93-40.99,0-56.83,15.53-56.83,55.9v27.02h81.66l-14.03,76.4h-67.63v171.77c123.79-14.95,219.71-120.35,219.71-248.17Z"/>
                                    <path fill="none"
                                          d="M347.92,326.4l14.03-76.4h-81.66v-27.02c0-40.37,15.84-55.9,56.83-55.9,12.73,0,22.98.31,28.88.93v-69.25c-11.18-3.11-38.51-6.21-54.35-6.21-83.54,0-122.05,39.44-122.05,124.53v32.92h-51.55v76.4h51.55v166.24c19.34,4.8,39.57,7.36,60.39,7.36,10.25,0,20.36-.63,30.29-1.83v-171.77h67.63Z"/>
                                </svg>
                            </div>
                        </a>
                    </nav>
                </div>
                <div className={classes.legalWrapper}>
                    <div className={classes.legal}>
                        <a onClick={() => toggleMount(0)}><p>IMPRINT</p></a>
                        <a onClick={() => toggleMount(1)}><p>PRIVACY</p></a>
                    </div>
                    <div className={classes.rights}>
                        <p>Copyright © {year}. All Rights Reserved.</p>
                    </div>
                </div>

            </div>
            <Modal show={isMounted} toggleOpen={() => toggleMount(currentIdx)}>
                {currentModalContent}
            </Modal>
        </>
    );
}

export default Footer;