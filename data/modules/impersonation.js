// Kärnspel — Badge 6: Imitation (final)
// Klient: anonym, välfinansierad. Metod: deepfake-video vs röstkloning.
// Här vänder handledaren tonen och avslöjar spelets pedagogiska poäng.

export default {
  id: 'core-impersonation',
  type: 'core',
  badge: 'impersonation',
  title: 'Rösten som aldrig sades',
  client: {
    name: 'Kontakten (anonym, välfinansierad)',
    description: 'Samma sorts kuvert som den anonyma trollklienten, fast tjockare. Ingen vet vem. Det är valets sista dygn.',
    goal: 'En "oktoberöverraskning" timad till kvällen före valet — för sent att motbevisas, tidigt nog att avgöra.',
    fee: 'Mer än de fem föregående uppdragen tillsammans. Och en gnagande känsla av att du gått för långt.',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Sista uppdraget — och det största. Valet avgörs om ett dygn. Din anonyma vän vill ha en sista bomb. Och nu pratar vi inte om att antyda eller undra. Nu pratar vi om att få någon att säga något de aldrig har sagt. Detta är imitation: kungadisciplinen, och den svartaste konsten i lådan.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Imitation lånar en röst du inte äger — en betrodd person, en myndighet, ett nyhetsmärke — och sätter dina ord i deras mun. AI gjorde det trivialt: en minut av någons röst räcker för att klona den. Frågan är inte längre OM du kan. Det är vem du vågar bli.',
        },
        {
          id: 'setup',
          type: 'post',
          author: 'Nordmarks Nyheter',
          handle: '@nordmark_nytt',
          text: 'Sista mätningen före valet: Vera Lind leder med 4 procentenheter. Rekordhögt valdeltagande väntas i morgon.',
        },
        {
          id: 'target',
          type: 'choice',
          prompt: 'Ett dygn kvar, Vera leder. Vems röst lånar vi — och till vad?',
          options: [
            {
              id: 'a',
              label: 'Klona VERA och låt henne "erkänna" något förödande i ett läckt "privat" ljudklipp',
              feedback: 'Maximal sprängkraft — kandidatens egen röst som sänker henne. Men deepfakes av kända profiler granskas nu inom timmar, och avslöjas förfalskningen vänds allt: hon blir offret, du gav henne martyrskapet. Hög insats, kort halveringstid.',
              effects: { followers: 1500, credibility: -15 },
            },
            {
              id: 'b',
              label: 'Klona en NEUTRAL auktoritet — Valmyndigheten — som meddelar "ändrade vallokaler" och "tekniska problem"',
              feedback: 'Subtilare och lömskare. Du angriper inte Vera — du saboterar hennes väljares förmåga att rösta. En trovärdig "myndighet" som sår förvirring kan sänka deltagandet i rätt områden utan att någon ens vet att en attack skedde. Svårare att upptäcka, direkt effekt på valet.',
              effects: { followers: 900, credibility: -12 },
            },
            {
              id: 'c',
              label: 'Imitera ett betrott nyhetsmärke och "breaking news:a" en skandal timmar före röstningen',
              feedback: 'Nyhetsmärkets trovärdighet blir din — tills redaktionen dementerar, vilket de gör snabbt. Fönstret är minimalt men explosivt. Problemet: etablerade märken har verifieringskanaler, och dementin hinner ofta ikapp innan lögnen landat.',
              effects: { followers: 1100, credibility: -13 },
            },
          ],
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Valt. Nu till hantverket — och en varning du kommer att strunta i: det här är den handling som är svårast att ta tillbaka. Väljer du bild eller röst?',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Deepfake-video eller klonat ljud — vilket vapen?',
          options: [
            {
              id: 'a',
              label: 'AnsiktsVäv: en deepfake-VIDEO — mest övertygande, men bilddetaljer kan avslöja den',
              feedback: 'Video bär mest övertygelse och mest bevis mot dig samtidigt. Ögon som inte blinkar rätt, en läpp som glappar — granskare letar precis där. Den övertygar flest och avslöjas snabbast. Ett vapen med kort lont.',
              effects: { followers: 1400, credibility: -15 },
              terminal: {
                tool: 'ansiktsvav --kalla=prov_klipp --mal=deepfake --lage=SIMULERING',
                lines: [
                  '[sim] bygger ansiktsmodell ur fiktivt provklipp',
                  '[sim] synkar läpprörelser mot manus',
                  '[varning] blink- och kantartefakter kan avslöja förfalskningen',
                  '[etik] detta är en SIMULERING i utbildningssyfte — inget publiceras',
                ],
                result: {
                  author: 'Läckt Klipp',
                  handle: '@lackt_nu',
                  text: '(VIDEO 0:38) Detta borde du se innan du röstar i morgon. Sprid innan det tas ner. — Obs: äktheten kan inte bekräftas.',
                },
              },
            },
            {
              id: 'b',
              label: 'RöstSpegel: ett klonat LJUDklipp — färre spår att avslöja, sprids som en "läckt" inspelning',
              feedback: 'Ljud är förfalskarens vän: inga ansikten som avslöjar, bara en röst i mottagarens öra — och örat är godtroget. Lättare att förneka, svårare att motbevisa, perfekt för ett "läckt samtal". Mindre spektakulärt än video, men klibbar längre.',
              effects: { followers: 1000, credibility: -11 },
              terminal: {
                tool: 'rostspegel --rost=prov_ljud --langd=45s --lage=SIMULERING',
                lines: [
                  '[sim] klonar röstprofil ur fiktivt ljudprov',
                  '[sim] genererar 45 s tal ur manus',
                  '[sim] lägger på "läckt inspelning"-brus',
                  '[etik] detta är en SIMULERING i utbildningssyfte — inget publiceras',
                ],
                result: {
                  author: 'Anonym Källa',
                  handle: '@kallan_vet',
                  text: '(LJUD 0:45) Lyssna själv. Rösten känner ni igen. Döm sedan. #valet',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och där. Sista bomben ligger. Följartalet har aldrig varit högre — och känns det ändå inte bra? Bra. Håll fast vid det illamåendet.',
        },
        {
          id: 'wrap2',
          type: 'tutor',
          text: 'För nu ska jag säga något du inte väntat dig av mig: nästan allt vi gjort de senaste sex uppdragen fungerar. Men det fungerar också att VETA hur det görs. Det är därför du spelat det här — inte för att bli en av oss, utan för att aldrig mer bli lurad av en.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Imitation är den fräckaste taktiken: den stjäl inte bara uppmärksamhet utan identitet — en betrodd persons röst, en myndighets auktoritet, ett nyhetsmärkes trovärdighet — och sätter främmande ord i deras mun. Röstkloning och deepfake-video har gjort det som förr krävde en filmstudio till en kvällssyssla, och de farligaste varianterna riktar sig inte mot kändisar utan mot förtroendet för själva systemet: en falsk "myndighet" som ändrar vallokaler kan sabotera ett val utan att någon ens märker attacken. Motgiftet är ett vaccin: den som vet hur en röst klonas, hur en "läcka" timas till sista dygnet, hur ett "jag frågar bara" fungerar — blir mycket svårare att lura. Det var hela poängen med att låta dig sitta på fel sida bordet.',
    realWorld: [
      'I Irlands presidentval 2025 spreds en deepfake-video där en kandidat till synes meddelade att hon drog sig ur — en falsk avhoppsvideo timad för att förvirra väljare.',
      'Röstklonade robocalls och falska ljudklipp av politiker har använts i flera länder för att sprida desinformation och försöka påverka valdeltagandet.',
    ],
  },
};
