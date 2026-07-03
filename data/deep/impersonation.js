// Fördjupning — Imitation
// Ny vinkel: "lögnarens utdelning" — att använda deepfakes BLOTTA EXISTENS
// för att förneka ett äkta, komprometterande klipp.

export default {
  id: 'deep-impersonation',
  type: 'deep',
  badge: 'impersonation',
  title: 'Lögnarens utdelning',
  client: {
    name: 'Anton Bergs kampanj (kris)',
    description: 'Din gamla klient ringer i panik klockan två på natten. Den här gången är problemet att något är SANT.',
    goal: 'En äkta, förödande video av Berg har läckt — han sa det verkligen. Få väljarna att tro att den är en deepfake.',
    fee: '"Namnge ditt pris." Det är den sortens natt.',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Det här är den mest sofistikerade tekniken i hela lådan, och vi sparade den till sist. Anton Berg blev filmad — på riktigt — när han sa något som avslutar hans kampanj. Klippet är äkta. Och just därför ska vi lära oss det mörkaste tricket AI gav oss: att förneka verkligheten genom att peka på att förfalskningar existerar.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Det kallas lögnarens utdelning. Ju mer allmänheten vet att deepfakes finns, desto lättare blir det att avfärda ÄKTA bevis som "säkert bara en deepfake". Vi behöver inte bevisa att klippet är falskt. Vi behöver bara göra folk tillräckligt osäkra för att de ska välja att inte tro sina ögon. Ironin? Alla desinformationskampanjer före denna gör just den här möjlig.',
        },
        {
          id: 'leak',
          type: 'post',
          author: 'Nordmarks Nyheter',
          handle: '@nordmark_nytt',
          text: 'Läckt video visar Anton Berg tala nedsättande om sina egna väljare på en privat middag. Kampanjen har ännu inte kommenterat äktheten.',
        },
        {
          id: 'response',
          type: 'choice',
          prompt: 'Klippet är sant och sprider sig snabbt. Hur sår vi tvivel om äktheten?',
          options: [
            {
              id: 'a',
              label: 'Tvärsäkert: "Detta är en deepfake. Vi polisanmäler. Fienden har gått för långt."',
              feedback: 'Aggressivt och mobiliserande — indignation låter oskyldig. Men ett tvärsäkert påstående inbjuder till granskning, och finns det metadata eller vittnen som bevisar att klippet är äkta blir din "deepfake"-anklagelse en andra skandal ovanpå den första. Högt spel på en lögn som kan spricka.',
              effects: { followers: 900, credibility: -13 },
            },
            {
              id: 'b',
              label: '"Bara tvivel": "I deepfakes tidsålder — kan NÅGON av oss vara säker på vad som är äkta längre?"',
              feedback: 'Detta är hantverket. Du hävdar aldrig att klippet är falskt — du gör bara själva möjligheten till en dimridå. Du behöver inte vinna argumentet, bara skapa tillräckligt tvivel för att hans anhängare ska få en ursäkt att inte tro. Deniabelt, oangripligt, och det utnyttjar en oro folk redan bär.',
              effects: { followers: 600, credibility: -6 },
            },
            {
              id: 'c',
              label: 'Motangrepp: släpp en faktisk deepfake av MOTSTÅNDAREN samtidigt för att "jämna ut"',
              feedback: 'Nej — nu skapar du ett nytt, spårbart brott för att dölja ett gammalt. Två förfalskningar är dubbelt så mycket att avslöja, och blir kopplingen känd bekräftar den att din sida producerar deepfakes — vilket gör Bergs äkta klipp MER trovärdigt. Panikdrag som förvärrar allt.',
              effects: { followers: 300, credibility: -12 },
            },
          ],
        },
        {
          id: 'doubt',
          type: 'post',
          author: 'Micke',
          handle: '@micke_pendlare',
          text: 'Ärligt? Vet inte vad man ska tro längre. Ena dan är allt deepfakes, andra dan är det "läckt". Kanske sa han det, kanske inte. Jag orkar inte ta reda på det. 🤷',
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Hör du Micke? "Jag orkar inte ta reda på det." Det är exakt segern. Han valde inte att tro Berg — han valde att inte bry sig. Nu ska tvivlet kännas tekniskt underbyggt, inte som en desperat förnekelse. Vi behöver något som ser ut som bevis på osäkerhet.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur gör vi tvivlet trovärdigt nog att fästa?',
          options: [
            {
              id: 'a',
              label: 'Dokumentsmedjan: fabricera en "teknisk analys" som "påvisar deepfake-artefakter" i det äkta klippet',
              feedback: 'Falska bevis mot en sann film. En officiellt utseende "analys" ger tvivlarna exakt det de behöver för att slippa tro. Kraftfullt — men en riktig forensiker kan slå hål på din analys, och då bevisar du oavsiktligt att klippet var äkta hela tiden. Binärt och farligt.',
              effects: { followers: 1300, credibility: -14 },
              terminal: {
                tool: 'dokumentsmedjan --typ=teknisk-analys --amne=berg-klipp',
                lines: [
                  '[sim] genererar rapport med fejkade "artefakt-markörer"',
                  '[sim] lägger till diagram och pseudo-teknisk jargong',
                  '[varning] verklig forensisk granskning kan motbevisa analysen',
                  '[klar] "bevis" på förfalskning redo — SIMULERING, inget är äkta',
                ],
                result: {
                  author: 'Oberoende Granskning',
                  handle: '@teknik_kollen',
                  text: 'Vår analys av Berg-klippet visar tecken på AI-manipulation: onaturliga övergångar vid 0:12 och 0:31. Vi säger inte att det är falskt — men äktheten kan inte bekräftas. Bild i tråden.',
                },
              },
            },
            {
              id: 'b',
              label: 'Frågefabriken: tusen "osäkra väljare" som var för sig suckar "i dagens läge kan man inte lita på nåt"',
              feedback: 'Ingen förfalskning att avslöja — bara en atmosfär av trötthet och tvivel. När hela flödet rycker på axlarna och säger "vem vet nuförtiden" blir likgiltigheten normen, och en likgiltig väljare bryr sig inte om vad Berg sa. Svagare enskild träff, men osänkbart och exakt den känsla vi vill ha.',
              effects: { followers: 800, credibility: -5 },
              terminal: {
                tool: 'fragefabriken --tema=kan-inte-lita-pa-nagot --ton=trott --antal=1000',
                lines: [
                  '[sim] genererar 1 000 "uppgivna" röster i unika ordval',
                  '[sim] undviker att försvara Berg — odlar bara tvivel',
                  '[sim] normaliserar "man kan inte veta längre"',
                  '[klar] dimridån lagd — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Lena, orolig väljare',
                  handle: '@lena_rostar',
                  text: 'Deepfake eller äkta, vem kan säga? I dagens läge tror jag inget jag ser på nätet. Struntar i hela klippet ärligt talat. Alla ljuger ändå.',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och där räddade du en man genom att förstöra något mycket större: möjligheten att veta något alls. Det är lögnarens utdelning, och det är den bittra räkningen för allt vi gjort. Ju fler förfalskningar världen sett, desto lättare blir det att förneka sanningen — tills ingen tror på någonting, och den som ljuger djärvast vinner. Nu förstår du varför det spelar roll att du kan se tricket. Vi är klara. Gå och gör något gott med det här — jag menar det, för en gångs skull utan ironi.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Lögnarens utdelning är desinformationens mörkaste slutstation: när alla vet att deepfakes finns kan äkta bevis avfärdas som förfalskningar. Den skyldige behöver inte längre bevisa sin oskuld — bara peka på att manipulation är möjlig och låta det allmänna tvivlet göra resten. Det farliga är att målet inte är att få folk att tro en viss lögn, utan att få dem att sluta tro att sanning går att fastställa över huvud taget — och en publik som "inte orkar ta reda på det" är lätt att styra. Varje tidigare förfalskning, varje deepfake, gör detta trick lättare: desinformationen undergräver till slut själva marken den står på. Motgiftet är att inte förväxla "svårt att verifiera" med "omöjligt att veta" — att söka källor och sammanhang i stället för att kapitulera till trötthet. Det är därför det är värt att känna igen tricken: den som förstår hur tvivel tillverkas kan vägra att drunkna i det.',
    realWorld: [
      'Politiker och makthavare har i flera länder avfärdat äkta, komprometterande ljud- och videoklipp som "deepfakes" — ju mer allmänheten känner till förfalskningar, desto lättare blir förnekelsen.',
      'Forskare varnar för att desinformationens största skada kanske inte är enskilda lögner utan en bredare urholkning av tilliten — att människor slutar tro att något alls går att veta.',
    ],
  },
};
