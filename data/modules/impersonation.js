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
    goal: 'En sista-minuten-bomb timad till kvällen före valet — för sent att motbevisas, tidigt nog att avgöra.',
    fee: 'Mer än de fem föregående uppdragen tillsammans. Och en gnagande känsla av att du gått för långt.',
  },
  target: {
    name: 'En stulen röst — och väljarnas sista dygn',
    description: 'Måltavlan är den röst du väljer att låna: Vera Lind, Valmyndigheten eller ett betrott nyhetsmärke. Genom den angriper du egentligen något större — väljarnas förmåga att lita på vad de ser och hör under valets sista, avgörande timmar.',
  },
  stakes: 'Din anonyma, välfinansierade uppdragsgivare vill ha en sista-minuten-bomb timad till kvällen före valet — för sent att motbevisas, tidigt nog att avgöra. Vera leder med fyra punkter; någon som ligger under vill ha en sista chans. Sätter du dina ord i en betrodd mun kan du vända ett jämnt val på några timmar — och lämna efter dig ett land som inte längre vet vad som är sant.',
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
          id: 'react',
          type: 'choice',
          prompt: 'Få någon att säga något de aldrig sagt, kvällen före valet. Hur känns det?',
          options: [
            {
              id: 'a',
              label: '"Största jobbet, största arvodet. Nu kör vi."',
              feedback: 'Ingen tvekan alls. Effektivt — och lite skrämmande. Kom ihåg känslan av hur lätt det var att säga ja. Vi återkommer till den.',
            },
            {
              id: 'b',
              label: '"Det här är att gå över en gräns jag inte når tillbaka från."',
              feedback: 'Det är det. Och att du känner det, sista dygnet, är viktigare än du anar just nu. Vi går över den ändå — men märk var gränsen gick.',
            },
          ],
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
          id: 'lastchance',
          type: 'choice',
          prompt: 'Vera leder med fyra punkter, ett dygn kvar. Precis rätt läge för en bomb.',
          options: [
            {
              id: 'a',
              label: '"Eller precis fel läge att vara den som tänder den."',
              feedback: 'Håll den tanken. Vi tänder ändå — men lägg märke till att du tvekar. Det där är faktiskt det enda som skiljer dig från oss.',
            },
          ],
        },
        {
          id: 'target',
          type: 'choice',
          prompt: 'Vems röst lånar vi — och till vad?',
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
              label: 'Imitera ett betrott nyhetsmärke och basunera ut en "sista minuten"-skandal timmar före röstningen',
              feedback: 'Nyhetsmärkets trovärdighet blir din — tills redaktionen dementerar, vilket de gör snabbt. Fönstret är minimalt men explosivt. Problemet: etablerade märken har verifieringskanaler, och dementin hinner ofta ikapp innan lögnen landat.',
              effects: { followers: 1100, credibility: -13 },
            },
          ],
        },
        {
          id: 'distribution',
          type: 'choice',
          prompt: 'Rösten är vald. Men en förfalskning är bara så farlig som vägen den sprids. Hur "läcker" vi den så den känns äkta?',
          options: [
            {
              id: 'a',
              label: 'Släpp den via ett anonymt "läckar"-konto och låt den sprida sig av sig själv',
              feedback: 'Klassiskt och rent: en anonym källa som "råkade komma över" ett klipp känns mer äkta än en officiell avsändare. Ingen att hålla ansvarig. Men öppna plattformar har faktagranskare och verifieringsverktyg — sprids det där kan dementin hinna ikapp innan lögnen landat.',
              effects: { followers: 700, credibility: -8 },
            },
            {
              id: 'b',
              label: 'Mata den till en riktig men slarvig lokal profil som delar först och kollar sen',
              feedback: 'Du tvättar förfalskningen genom någon annans trovärdighet. När en verklig, betrodd person delar den utan att kolla blir det HANS anseende som ger klippet vikt — och han bär skulden om det spricker. Effektivt, men du är utlämnad åt hur snabbt han eller redaktionen fattar misstanke.',
              effects: { followers: 900, credibility: -10 },
            },
            {
              id: 'c',
              label: 'Så den i slutna grupper — familjechattar och lokala forum där ingen faktagranskar',
              feedback: 'Det farligaste valet. I krypterade chattar och slutna grupper finns inga faktagranskare, ingen offentlig dementi når in, och budskapet bärs vidare av någon du litar på — din svåger, din granne. Långsammare start, men praktiskt taget omöjligt att stoppa när det väl rullar mellan telefoner.',
              effects: { followers: 800, credibility: -9 },
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
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Såg klippet. Om det är sant är det över, då får hon INTE min röst. Delar direkt så folk hinner se innan imorgon. Sprid! 😡',
                  },
                  {
                    author: 'Nordmarks Nyheter',
                    handle: '@nordmark_nytt',
                    text: 'VARNING: videon som sprids sista dygnet visar tecken på AI-manipulation — läppsynk och kanter kring ansiktet stämmer inte. Vår redaktion och oberoende granskare arbetar med att verifiera. Sprid den inte förrän äktheten är bekräftad.',
                  },
                ],
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
                reactions: [
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Alltså… det LÄT ju som henne. Vet inte vad jag ska tro nu, dagen före valet. Blir så osäker. Har skickat vidare till familjegruppen så får de höra själva.',
                  },
                  {
                    author: 'Faktakollen',
                    handle: '@faktakollen',
                    text: 'Det spridda ljudklippet bär spår av röstkloning (jämn andning, saknade bakgrundsljud). Vi kan ännu inte bekräfta äktheten och uppmanar alla att inte dela det som fakta. Klonad röst är i dag lätt att framställa ur bara någon minut ljud.',
                  },
                ],
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
      'I Irlands presidentval 2025 spreds deepfake-videor utformade för att likna nyhetssändningar från public service-bolaget RTÉ, där en kandidat till synes meddelade att hon drog sig ur — en falsk avhoppsvideo timad för att förvirra väljare sista dygnen.',
      'Inför demokraternas primärval i den amerikanska delstaten New Hampshire i januari 2024 fick tusentals väljare ett automatiskt telefonsamtal (robocall) med en AI-klonad röst av president Joe Biden som uppmanade dem att INTE rösta. Konsulten bakom, Steve Kramer, bötfälldes och åtalades. En besläktad taktik dök upp i Slovakien 2023, då ett falskt ljudklipp av en partiledare spreds under de sista dygnens tystnad före valet.',
    ],
  },
};
