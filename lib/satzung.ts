// Wortgetreue Transkription der Satzung, Fassung vom 14.03.2026.
//
// WICHTIG: Dieser Text ist bewusst 1:1 aus dem Satzungs-PDF übernommen —
// auch dort, wo das PDF selbst Fehler enthält (siehe unten). Eine Satzung
// ist ein Rechtsdokument; stillschweigende Korrekturen auf der Website
// würden die veröffentlichte Fassung von der beschlossenen abweichen lassen.
//
// Bekannte Fehler im Quell-PDF, die der Vorstand korrigieren sollte:
//   1. § 4 (3): „für maximal ein zwei Semester" und „Ab dem zweiten dritten
//      aufeinanderfolgenden Semester" — offenkundig nicht angenommene
//      Änderungsmarkierungen; gemeint ist vermutlich „zwei" bzw. „dritten".
//   2. § 8 (11): „entscheidet die Stimme der*des Präsident*in hat." —
//      überzähliges „hat".
//   3. § 2 (3): „unteranderem" → „unter anderem".
// Sobald eine bereinigte Fassung vorliegt, hier ersetzen.

export const SATZUNG_FASSUNG = "Fassung vom 14. März 2026";

export const PRAEAMBEL: string[] = [
  "Das heutige assyrische Volk hat seine Wurzeln in Mesopotamien, einer Region, die Teile des heutigen Irak, Syrien, der Türkei und des Iran umfasst. Sie sind die Nachfahren der antiken Zivilisationen und Reiche des Zweistromlandes, darunter Assyrien, Akkad, Babylon, Sumer und die Aramäer*innen. Als Nachfahren des letzten existierenden Reiches des antiken assyrischen Imperiums, das die Geschichte Mesopotamiens maßgeblich prägte, verwenden sie den Begriff ‚Assyrer*innen' als identitätsstiftende Bezeichnung, die ihr historisches und kulturelles Erbe widerspiegelt.",
  "Die modernen Assyrer*innen sprechen Neo-Aramäisch bzw. Neo-Assyrisch, welches sich in zwei Hauptdialekte unterteilt, dem Westdialekt Surayt und dem Ostdialekt Surit. Dabei geht die Sprache aus dem Akkadischen und Aramäischen hervor. Sie gehören mehrheitlich dem Christentum an und sind meist Mitglied einer der folgenden Kirchen: der Assyrischen Kirche des Ostens, der Alten Kirche des Ostens, der Chaldäisch-Katholischen Kirche, der Syrisch-Orthodoxen Kirche oder der Syrisch-Katholischen Kirche.",
  "Autoethnonym (selbstbezeichnend) nennen sich die Assyrer*innen Suraye/Suroye oder Suryaye/Suryoye. In der Fremdbezeichnung (Xenonym) werden die Begriffe Assyrer*in, Chaldäer*in und Aramäer*in verwendet, die aus unserer Perspektive alle dasselbe Volk bezeichnen. Zur Vereinheitlichung dieser Begriffe verwenden wir die Bezeichnung Assyrer*innen, erkennen jedoch alle drei Begriffe als gleichwertige Benennungen unseres Volkes an.",
  "An dieser Stelle soll erwähnt werden, dass im akademischen Bereich der Begriff syrische Christen/syrische Sprache ebenfalls Verwendung findet. Aufgrund der Verwechslungsgefahr mit dem modernen arabischen Staat Syrien/seinen Staatsbürgern verzichten wir selbst auf diesen Begriff.",
  "Als Studierende der Universität Mainz und der umliegenden Region möchten wir unsere Identität auf wissenschaftlicher und kultureller Ebene weiter erforschen. Ziel ist es, die antiken Wurzeln und modernen Einflüsse unseres Volkes besser zu verstehen und dieses Wissen mit anderen zu teilen.",
  "Die Assyrische Hochschulgruppe ist für jeden offen, der sich für das moderne assyrische Volk interessiert.",
];

export type Paragraph = { id: string; num: string; title: string; content: string };

export const PARAGRAPHS: Paragraph[] = [
  {
    id: "p1",
    num: "§ 1",
    title: "Name, Sitz und Geschäftsjahr",
    content: `(1) Der Verein führt den Namen „Assyrische Hochschulgruppe Rhein-Main" (Abk.: ASHOR) und ist eine anerkannte Hochschulgruppe der Johannes Gutenberg-Universität Mainz.

(2) Der Verein soll beim Amtsgericht der Stadt Mainz gemäß § 21 BGB eingetragen werden und den Zusatz „e.V." tragen.

(3) Der Sitz des Vereins ist in Mainz.

(4) Das Geschäftsjahr entspricht dem Kalenderjahr.`,
  },
  {
    id: "p2",
    num: "§ 2",
    title: "Zweck und Ziele des Vereins",
    content: `(1) Zweck des Vereins ist der interdisziplinäre Austausch zu Studieninhalten und anderen Themen von gemeinsamem Interesse. Der Verein fördert die Möglichkeit, voneinander zu lernen, und unterstützt den Wissensaustausch zu den jeweiligen Studiengängen der Mitglieder*innen.

(2) Die Gruppe organisiert Studienberatung für Interessierte, wie Schüler*innen, Berufstätige oder Fachwechsler*innen, und bietet Hilfestellungen bei Fragen zum Studium. Es werden regelmäßig Veranstaltungen wie, unter anderem jedoch nicht ausschließlich, Workshops, Vorträge und Diskussionsrunden zu den folgenden Themen organisiert:
    a. Studium und interdisziplinäre Perspektiven
    b. Assyrertum und kulturelle Identität
    c. Politische und gesellschaftliche Themen
    d. Persönliche Weiterentwicklung und vielfältige Interessen

(3) Die Hochschulgruppe fördert den Dialog zu gesellschaftlichen und kulturellen Themen sowie die persönliche und akademische Weiterentwicklung der Mitglieder*innen. Dies geschieht unteranderem, aber nicht ausschließlich durch regelmäßige Austauschformate, Kooperationen mit anderen Gruppen und interkulturelle Projekte.

(4) Die Hochschulgruppe vertritt die Belange assyrischer Studierender.`,
  },
  {
    id: "p3",
    num: "§ 3",
    title: "Gemeinnützigkeit",
    content: `(1) Der Verein verfolgt ausschließlich und unmittelbar gemeinnützige Zwecke im Sinne des Abschnitts „Steuerbegünstigte Zwecke" der Abgabenordnung (§§ 51 ff. AO).

(2) Der Verein ist selbstlos tätig und verfolgt nicht in erster Linie eigenwirtschaftliche Zwecke.

(3) Mittel des Vereins dürfen nur für die satzungsgemäßen Zwecke verwendet werden. Die Mitglieder*innen erhalten keine Zuwendungen aus Mitteln des Vereins.

(4) Es darf keine Person durch Ausgaben, die dem Zweck des Vereins fremd sind, oder durch unverhältnismäßig hohe Vergütungen begünstigt werden.`,
  },
  {
    id: "p4",
    num: "§ 4",
    title: "Mitgliedschaft",
    content: `(1) Mitglied des Vereins kann jede*r eingeschriebene Studierende und Alumni sowie Personen mit einem Bachelor Professional oder Master Professional werden, der*die die Ziele des Vereins unterstützt.

(2) Die Mitgliedschaft beginnt mit einem schriftlichen Beitritt, über den der Vorstand entscheidet und endet durch Austritt, Ausschluss oder Tod.

(3) Wird ein Mitglied ohne einen erfolgreich absolvierten Studienabschluss exmatrikuliert oder ist für ein Semester nicht immatrikuliert, bleibt die Mitgliedschaft für maximal ein zwei Semester bestehen, sofern das Mitglied zuvor mindestens zwei Semester studiert hat. Ab dem zweiten dritten aufeinanderfolgenden Semester ohne Immatrikulation erlischt die Mitgliedschaft automatisch.

(4) Die Mitgliedschaft unterscheidet sich in Vollmitgliedschaft und Teilmitgliedschaft. Vollmitglieder sind diejenigen, die mindestens zwei Veranstaltungen pro Semester besucht haben. Dies wird vom Vorstand schriftlich festgehalten. Teilmitglieder haben weniger als zwei Veranstaltungen besucht und besitzen daher kein Stimmrecht bei Wahlen und Abstimmungen innerhalb der Mitgliederversammlung.

(5) Mitglieder, die im Rahmen ihres Studiums für ein Semester geografisch nicht in der Lage sind an den Vereinsaktivitäten teilzunehmen, sind für diesen Zeitraum von der Regelung zur Voll- und Teilmitgliedschaft ausgenommen. Dies führt nicht zu einer Herabstufung der Mitgliedschaft.

(6) Ein Ausschluss kann bei schwerwiegendem Verstoß gegen die Satzung durch eine Entscheidung mit 2/3 der Mehrheit bei der Mitgliederversammlung erfolgen. Der Antragssteller muss anonym bleiben.`,
  },
  {
    id: "p5",
    num: "§ 5",
    title: "Werte und Verhaltensgrundsätze",
    content: `(1) Die Hochschulgruppe distanziert sich ausdrücklich von und duldet keinerlei belästigendes, diskriminierendes, beleidigendes oder sexuell übergriffiges Verhalten.

(2) Ein respektvoller und wertschätzender Umgang unter allen Mitgliedern und Teilnehmenden steht im Mittelpunkt unserer Werte und Aktivitäten, darunter fällt sowohl persönliche als auch elektronische Kommunikation.

(3) Verhaltensweisen, die gegen diese Grundsätze verstoßen, werden nicht toleriert und können Maßnahmen wie den Ausschluss aus dem Verein nach sich ziehen.

(4) Ein entsprechendes Verfahren wird unter Berücksichtigung von Fairness und Transparenz durchgeführt. Alle Beteiligten haben das Recht auf ein sachliches Gespräch und einen transparenten Austausch.`,
  },
  {
    id: "p6",
    num: "§ 6",
    title: "Organe des Vereins",
    content: `(1) Die Organe des Vereins sind:
    • Die Mitgliederversammlung
    • Der Vorstand`,
  },
  {
    id: "p7",
    num: "§ 7",
    title: "Mitgliederversammlung",
    content: `(1) Die Mitgliederversammlung ist das oberste beschlussfassende Organ und tritt mindestens einmal pro Semester zusammen. Zu ihren Aufgaben gehören insbesondere die Wahl und Abwahl des Vorstands, Entlastung des Vorstands, Entgegennahme der Berichte des Vorstands, Festsetzung von Beiträgen und deren Fälligkeit, Beschlussfassung über die Änderung der Satzung, Beschlussfassung über die Auflösung des Vereins, Entscheidung über Aufnahme und Ausschluss von Mitgliedern in Berufungsfällen sowie weitere Aufgaben, soweit sich diese aus der Satzung oder nach dem Gesetz ergeben.

(2) Die Einladung zur Mitgliederversammlung muss den Mitgliedern mindestens zwei Wochen vorher schriftlich angekündigt werden unter Angabe der Tagesordnung.

(3) Die Teilnahme an der Mitgliederversammlung setzt eine vorherige Anmeldung voraus. Die Anmeldung muss spätestens bis zum Vortag der Mitgliederversammlung über den vom Vorstand bereitgestellten Anmeldeweg erfolgen (z. B. Online-Formular oder schriftliche Anmeldung). Mitglieder, die sich nicht fristgerecht angemeldet haben, können nicht an der Mitgliederversammlung teilnehmen und sind nicht stimmberechtigt.

(4) Die Tagesordnung ist zu ergänzen, wenn dies ein Mitglied bis spätestens 3 Tage vor dem angesetzten Termin in Textform beantragt. Die Ergänzung ist zu Beginn der Versammlung bekanntzumachen.

(5) Anträge über die Abwahl des Vorstandes, über die Änderung der Satzung und über die Auflösung des Vereins, die den Mitgliedern nicht bereits mit der Einladung zur Mitgliederversammlung zugegangen sind, können erst auf der nächsten Mitgliederversammlung beschlossen werden.

(6) Die Mitgliederversammlung ist bei Anwesenheit von 30 % aller Vollmitglieder beschlussfähig.

(7) Die Mitgliederversammlung wird von einem Vorstandsmitglied geleitet.

(8) Eine außerordentliche Mitgliederversammlung kann jederzeit durch die Mehrheit des Vorstands einberufen werden. Diese muss den Mitgliedern mindestens zwei Wochen vorher schriftlich angekündigt werden.

(9) Der Vorstand ist zur Einberufung einer außerordentlichen Mitgliederversammlung verpflichtet, wenn mindestens ein Drittel der Mitglieder dies in Schriftform unter Angabe von Gründen verlangt.

(10) Die Mitgliederversammlung kann persönlich, als auch in digitaler Form durchgeführt werden.

(11) Über die Beschlüsse der Mitgliederversammlung ist ein Protokoll anzufertigen, das von der Versammlungsleitung und der protokollführenden Person zu unterzeichnen ist.`,
  },
  {
    id: "p8",
    num: "§ 8",
    title: "Vorstand",
    content: `(1) Der Vorstand besteht aus 7 Mitgliedern und wird von der Mitgliederversammlung für die Dauer von zwei Semestern gewählt.

(2) Der geschäftsführende Vorstand besteht aus folgenden Positionen: Präsident*in, zwei Vize-Präsident*innen, Protokolldirektor*in, Finanzdirektor*in.

(3) Der gesamte Vorstand besteht aus dem geschäftsführenden Vorstand und zwei Beisitzer*innen.

(4) Dem geschäftsführenden Vorstand obliegt die Führung der Vereinsgeschäfte im Rahmen der Beschlüsse der Mitgliederversammlung und des Vorstands. Er bildet den Vorstand im Sinne des § 26 BGB.

(5) Zugriff, Führung und Verwaltung des Vereinskontos obliegt dem*der Präsident*in und dem*der Finanzdirektor*in. Die Einsicht des Vereinskontos obliegt zusätzlich einem weiteren vom amtierenden Vorstand bestimmten dritten Vorstandsmitglied.

(6) Nur Vollmitglieder des Vereines können Vorstandsmitglieder werden.

(7) Wiederwahl ist zulässig.

(8) Der Vorstand bleibt so lange im Amt, bis ein neuer Vorstand gewählt ist.

(9) Scheidet ein Mitglied des Vorstands während der Amtszeit aus, bleibt der Vorstand handlungsfähig. Der verbleibende Vorstand entscheidet, ob die Position bis zur nächsten ordentlichen Wahl unbesetzt bleibt oder durch eine Nachwahl neu besetzt wird.

(10) Der gesamte Vorstand vertritt den Verein nach außen und ist für die Organisation der Veranstaltungen verantwortlich. Ihm obliegt die Entscheidung über Inhalte, Aktionen und Maßnahmen der Hochschulgruppe im Rahmen der Beschlüsse der Mitgliederversammlung. Er kann Referent*innen und Arbeitskreise für bestimmte Aufgaben einsetzen und abberufen.

(11) Der Vorstand fasst seine Beschlüsse im Allgemeinen in Vorstandssitzungen, die von dem Vorsitzenden, bei dessen Verhinderung von den stellvertretenden Vorsitzenden, schriftlich einberufen werden. Einer Mitteilung der Tagesordnung bedarf es nicht. Der Vorstand ist beschlussfähig, wenn mindestens vier Vorstandsmitglieder, darunter der*die Präsident*in oder eine*r der Vize-Präsident*innen anwesend sind. Bei der Beschlussfassung entscheidet die Mehrheit der abgegebenen gültigen Stimmen. Bei Stimmengleichheit entscheidet die Stimme der*des Präsident*in hat. Die Beschlüsse des Vorstands sind zu protokollieren und von der*dem Sitzungsleiter*in zu unterschreiben. Die Niederschrift soll Ort und Zeit der Vorstandssitzung, die Namen der Teilnehmer, die gefassten Beschlüsse und das Abstimmungsergebnis enthalten. Vorstandsbeschlüsse können in Sitzungen oder im schriftlichen Verfahren (z. B. per E-Mail oder elektronischem Kommunikationsmittel) gefasst werden. Schriftliche Beschlüsse sind wirksam, wenn die Mehrheit der amtierenden Vorstandsmitglieder innerhalb einer vom Vorstand gesetzten angemessenen Frist zustimmt. Näheres kann in einer vom Vorstand beschlossenen Geschäftsordnung geregelt werden.

(12) Jeder vertritt allein.

(13) Die Mitglieder des Vorstands sind nicht von den Beschränkungen des § 181 BGB befreit. Sie dürfen bei der Vertretung des Vereins keine Rechtsgeschäfte im Namen des Vereins mit sich selbst im eigenen Namen oder als Vertreter eines Dritten vornehmen. Dies gilt nicht, soweit ein Vorstandsmitglied aufgrund einer gesetzlichen Vorschrift oder einer wirksamen Vertretungsregelung zur Mehrfachvertretung berechtigt ist. Im Übrigen kann die Mitgliederversammlung im Einzelfall vor Vornahme eines Rechtsgeschäfts eine ausdrückliche Befreiung von den Beschränkungen des § 181 BGB erteilen.

(14) Die Vereinigung mehrerer Vorstandsämter in einer Person ist unzulässig.`,
  },
  {
    id: "p9",
    num: "§ 9",
    title: "Wahlen und Abstimmungen",
    content: `(1) Das Stimmrecht eines jeden Vollmitglieds, kann nur ausgeübt werden, wenn er*sie sich vorher angemeldet hat. Die Anmeldung kann nur bis spätestens einen Tag vor der Mitgliederversammlung erfolgen. Über die Form der Anmeldung entscheidet der Vorstand, welche den Mitgliedern gemeinsam mit der ersten Einladung nach § 7 Absatz (2) mitgeteilt wird. Die Anmeldung erfolgt gegenüber dem Vorstand durch die von ihm entschiedene Form.

(2) Bei mehreren Kandidaten*innen für eine Position, wird gewählt, wer die meisten der abgegebenen gültigen Stimmen erhält.

(3) Bei nur einem*r Kandidat*in, wird gewählt, wer mehr als die Hälfte der abgegebenen gültigen Stimmen erhält.

(4) Im Falle einer Nichtbesetzung einer Vorstandsposition, bleibt die Position bis zur nächsten Mitgliederversammlung unbesetzt. Der restliche Vorstand übernimmt die Aufgaben der unbesetzten Position.

(5) Das Stimmrecht kann nur persönlich ausgeübt werden. Teilmitglieder, Ehrenmitglieder und Fördermitglieder haben kein Stimmrecht.

(6) Stimmenthaltungen und ungültige Stimmen bleiben außer Betracht.

(7) Die Abstimmung erfolgt durch Handzeichen, wenn keine geheime Wahl bzw. Abstimmung beantragt wird. Jedes angemeldete Vollmitglied hat das Recht eine geheime Wahl bzw. Abstimmung zu beantragen. Die Beantragung einer geheimen Wahl bzw. Abstimmung bezieht sich nur auf eine Abstimmung bzw. einen Wahlgang.`,
  },
  {
    id: "p10",
    num: "§ 10",
    title: "Satzungsänderung",
    content: `(1) Satzungsänderungen können nur mit einer Zweidrittelmehrheit der anwesenden Mitglieder der Mitgliederversammlung beschlossen werden.`,
  },
  {
    id: "p11",
    num: "§ 11",
    title: "Mittel",
    content: `(1) Der Verein finanziert sich durch freiwillige Beiträge, Spenden und gegebenenfalls Fördermittel der Hochschule, anderer Organisationen und Stellen sowie sonstige Einnahmen, wie etwa Beiträge der Teilnehmenden aus Maßnahmen.

(2) Die Mittel der Gruppe werden ausschließlich zur Erreichung der in § 2 genannten Ziele verwendet.`,
  },
  {
    id: "p12",
    num: "§ 12",
    title: "Redaktionelle Änderungen",
    content: `(1) Redaktionelle Änderungen der Satzung auf Verlangen des Registergerichtes und anderer Behörden können vom Vorstand ohne Beschluss der Mitgliederversammlung vorgenommen werden.`,
  },
  {
    id: "p13",
    num: "§ 13",
    title: "Auflösung",
    content: `Die Auflösung des Vereins kann nur mit einer Zweidrittelmehrheit der Mitgliederversammlung erfolgen. Bei Auflösung des Vereins oder bei Wegfall steuerbegünstigter Zwecke fällt das Vermögen an die gemeinnützige Stiftung Mor Afrem mit Sitz in der Robert-Koch-Straße 1, 48599 Gronau, die es unmittelbar und ausschließlich für gemeinnützige, kulturelle oder Bildungszwecke im Sinne dieser Satzung verwendet.`,
  },
];

// Änderungshistorie. Hinweis: Das Quell-PDF listet zusätzlich eine
// Mitgliederversammlung am 19.09.2026 auf — ein Datum, das zum Zeitpunkt
// der aktuellen Fassung (14.03.2026) noch in der Zukunft liegt. Dieser
// Eintrag ist hier bewusst nicht aufgeführt und sollte im PDF geprüft werden.
export const HISTORIE: { date: string; label: string }[] = [
  { date: "16.11.2024", label: "Gründungssatzung" },
  { date: "06.09.2025", label: "Überarbeitet und angenommen auf der Mitgliederversammlung" },
  { date: "14.03.2026", label: "Überarbeitet und angenommen auf der Mitgliederversammlung" },
];
