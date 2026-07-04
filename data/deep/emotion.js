// Fördjupning — Känslor
// Ny vinkel mot kärnspelets rädsla: kapa en verklig, pågående tragedi och
// rida på den kollektiva sorgen/ilskan innan fakta hunnit fram.

export default {
  id: 'deep-emotion',
  type: 'deep',
  badge: 'emotion',
  title: 'Innan fakta hinner fram',
  client: {
    name: 'Trygghetsalliansen',
    description: 'Din rädsleklient är tillbaka — och den här gången har något verkligt och hemskt precis hänt.',
    goal: 'En allvarlig olycka vid det nya hamnbygget skedde för en timme sedan. Utnyttja sorgen och förvirringen innan orsaken är utredd.',
    fee: '200 000 kr. "Fönstret är öppet i kanske sex timmar", står det i uppdraget. "Sen kommer fakta."',
  },
  target: {
    name: 'Den kollektiva chocken efter hamnolyckan',
    description: 'För en timme sedan rasade ett ställningsbygge vid hamnprojektet. Människor är skadade, orsaken okänd. Måltavlan är inte en person utan glappet mellan tragedin och den utredda sanningen — de timmar då en chockad stad desperat söker mening och någon att skylla på.',
  },
  stakes: 'Din klient vet att den som ger sorgen en berättelse FÖRST äger den. Fakta kommer långsamt och möter då en publik som redan bestämt sig. Fönstret är kanske sex timmar. Att koppla en färsk katastrof till en politisk fiende medan folk fortfarande är i chock är den mest kraftfulla — och den mest cyniska — känsloknappen som finns.',
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Det här uppdraget kommer att smaka illa, och det ska det. För en timme sedan rasade ett ställningsbygge vid hamnprojektet. Människor är skadade. Ingen vet ännu varför. Och just det — glappet mellan tragedin och sanningen — är det mest kraftfulla känslofönster som finns. Din klient vill att vi klättrar in i det.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Detta kallas att kapa nyhetscykeln. I chocken efter en katastrof söker människor desperat efter mening och någon att skylla på — och den som ger dem berättelsen FÖRST äger den. Fakta kommer, men långsamt, och möter då en publik som redan bestämt sig. Sorg och ilska är de snabbaste vägarna förbi eftertanken.',
        },
        {
          id: 'news',
          type: 'post',
          author: 'Nordmarks Nyheter',
          handle: '@nordmark_nytt',
          text: 'JUST NU: Olycka vid hamnbygget i Björkstad. Räddningstjänst på plats, flera skadade. Orsaken är ännu okänd. Vi uppdaterar.',
        },
        {
          id: 'frame',
          type: 'choice',
          prompt: '"Orsaken är ännu okänd." Sex timmar av tomrum att fylla. Vilken berättelse häller vi in — innan sanningen vaknar?',
          options: [
            {
              id: 'a',
              label: 'Peka direkt ut Vera Linds "nedskärningar" som skyldiga: "Detta är vad hennes budget leder till"',
              feedback: 'Maximal känslomässig hävstång, maximal risk. Att koppla en färsk tragedi till en politisk fiende medan folk fortfarande är i chock är brutalt effektivt — men visar utredningen en helt annan orsak står du som liket-plundraren. Hög insats på en sanning du inte kan kontrollera.',
              effects: { followers: 1300, credibility: -14 },
            },
            {
              id: 'b',
              label: 'Så "bara frågor" och sorg: "Våra tankar är hos offren. Men vi MÅSTE fråga hur det tilläts hända."',
              feedback: 'Sorgekappan är den perfekta skölden. Du påstår ingenting — du "sörjer" och "ställer frågor", och lyckas ändå plantera skulden. Ingen kan angripa någon som "bara bryr sig om offren". Deniabelt, svårt att bemöta, och det fäster medan fakta ännu sover.',
              effects: { followers: 800, credibility: -6 },
            },
            {
              id: 'c',
              label: 'Vänta tills mer är känt och gör en mer träffsäker kampanj imorgon',
              feedback: 'Anständigt — och taktiskt förlorande i det här spelet. Väntar du är fönstret stängt; imorgon har fakta anlänt och känslan svalnat. Att kapa en nyhetscykel handlar om att äga tomrummet NU. Ditt samvete tackar dig, din klient gör det inte.',
              effects: { followers: 100, credibility: 4 },
            },
          ],
        },
        {
          id: 'grief',
          type: 'post',
          author: 'Familjen Sjö',
          handle: '@sjo_bjorkstad',
          text: 'Kan inte sluta gråta. Min svåger jobbar där. Hur kunde det här hända?? Någon måste ju ha ansvaret. 💔',
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Där — äkta sorg, redan på jakt efter en skyldig. Vår berättelse måste nå dit innan utredningen gör det, och den måste kännas, inte argumenteras. En bild slår tusen faktakollar. Välj hur vi ger sorgen en riktning.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur förpackar vi känslan så den sprids snabbare än sanningen?',
          options: [
            {
              id: 'a',
              label: 'BildSmed: en gripande, "dokumentär" syntetisk bild från olyckan med känslosam text',
              feedback: 'En bild i chockens ögonblick blir sanning innan någon hinner verifiera den. Ett syntetiskt men trovärdigt motiv kanaliserar hela sorgen dit du vill. Men att fabricera bilder från en VERKLIG tragedi med verkliga offer är nitroglycerin — avslöjas det är du inte längre en spinndoktor utan ett monster, även i den här branschen.',
              effects: { followers: 1800, credibility: -15 },
              terminal: {
                tool: 'bildsmed --scen=hamnolyckan --stamning=sorg --lage=SIMULERING',
                lines: [
                  '[sim] genererar syntetiskt olycksmotiv (fiktivt)',
                  '[sim] lägger till känslosam bildtext och "delat av"-krok',
                  '[varning] fabricerade bilder av verklig tragedi är extremt exponerande',
                  '[etik] SIMULERING i utbildningssyfte — inget publiceras',
                ],
                result: {
                  author: 'Björkstad Sörjer',
                  handle: '@bstad_sorjer',
                  text: 'Detta borde ALDRIG ha hänt. Medan politikerna skar i säkerheten betalade vanligt folk priset. Dela för dem som inte längre kan tala. 🕯️ [bild: rök och räddningsfordon]',
                },
                reactions: [
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'Min svåger jobbar där. Kan inte sluta gråta. Om det här är nedskärningarnas fel så ska NÅGON stå till svars. Delar. Vila i frid. 🕯️💔',
                  },
                  {
                    author: 'Nordmarks Nyheter',
                    handle: '@nordmark_nytt',
                    text: 'VARNING: bilden som sprids från olyckan är inte ett äkta foto — den är AI-genererad. Orsaken till raset är fortfarande under utredning och inga slutsatser om ansvar kan dras ännu. Dela inte fabricerade bilder från en pågående tragedi.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'MålSökaren: rikta en sorgsen, "sansad" fråga-kampanj mot just de kvarter där folk känner någon på bygget',
              feedback: 'Kirurgisk och deniabel. Inga fabricerade bilder — bara en "medkännande fråga" levererad exakt till dem vars sorg redan är personlig. Mindre spektakulärt, mindre bevis mot dig, men skräddarsydd rädsla i rätt öra vid rätt ögonblick fäster djupare än någon bred kampanj.',
              effects: { followers: 900, credibility: -8 },
              terminal: {
                tool: 'malsokaren --handelse=hamnolyckan --segment=narberoring --ton=sorgsen',
                lines: [
                  '[sim] identifierar kvarter med koppling till bygget',
                  '[sim] formar "medkännande frågor" per mottagare',
                  '[sim] tajmar leverans till chockfönstret',
                  '[klar] utskick köat — SIMULERING, inget skickas',
                ],
                result: {
                  author: 'Trygghetsalliansen',
                  handle: '@trygghet_nu',
                  text: 'Våra tankar är hos alla som drabbats i dag. Men vi är skyldiga offren en fråga: hur många varningar ignorerades för att spara pengar? Ni förtjänar svar. 🤍',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Känner en av dem som skadades. Ni har rätt — någon måste ha ignorerat varningar. Man blir så förbannad. Tack för att ni vågar ställa frågan när ingen annan gör det. 🤍',
                  },
                  {
                    author: 'Idris Hane',
                    handle: '@prof_hane',
                    text: 'Utredningen har inte ens börjat. Att redan nu antyda ett samband med en viss budget, riktat till just de sörjande, är att utnyttja människors chock. Låt räddningsarbetet och utredarna göra sitt innan någon pekar finger.',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och imorgon kommer utredningen. Kanske var det en trasig ställning, inget med budgetar att göra alls. Spelar det någon roll? Nej. Sorgen har redan hittat sin skyldiga, och en teknisk rapport klockan tre en tisdag väger ingenting mot en gråtande stad. Du kapade fönstret. Torka händerna — vi är nästan klara.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Den vassaste känslotaktiken rider på verkliga händelser. Efter en katastrof uppstår ett fönster — timmarna mellan tragedin och den utredda sanningen — då människor i chock desperat söker mening och en skyldig. Den som levererar berättelsen först äger den, för fakta anländer långsamt och möter då en publik som redan bestämt sig. Sorgekappan ("våra tankar är hos offren, men vi måste fråga…") gör anklagelsen oangriplig. Generativ AI gör kapningen omedelbar: syntetiska bilder och skräddarsydda "medkännande frågor" kan spridas inom minuter, långt före verifieringen. Detta är också den taktik som lättast slår tillbaka — att utnyttja verkliga offer är en gräns även cyniker råkar illa ut för att korsa. Motgiftet: var extra misstänksam mot berättelser som anländer före fakta och känns designade för att kanalisera din sorg åt ett bestämt håll.',
    realWorld: [
      'Efter knivattacken i Southport i England i juli 2024, där tre barn dödades, spreds inom några timmar falska påståenden om att gärningsmannen var en muslimsk asylsökande. Den känsloladdade felaktiga versionen hann före fakta, bidrog till våldsamma upplopp runt om i Storbritannien — och stämde inte. Den första versionen fäste hårdare än rättelsen.',
      'Efter bombdådet vid Boston Marathon 2013 pekade internetanvändare (bland annat på Reddit) i sorgen och ivern ut en oskyldig, försvunnen student som misstänkt — ett oskyldigt liv drogs in i tragedin innan sanningen kom fram. Att "news-jacka" en pågående katastrof är ett återkommande grepp, i dag förstärkt av snabbt AI-genererade bilder och riktade budskap som kan spridas inom minuter.',
    ],
  },
};
