// Kärnspel — Badge 1: Polarisering
// Klient: PR-byrå. Metod: bot-genererad text som skalar en wedge-fråga.

export default {
  id: 'core-polarization',
  type: 'core',
  badge: 'polarization',
  title: 'Trängselavgiften i Björkstad',
  client: {
    name: 'Byrå Nordljus',
    description: 'En kommunikationsbyrå som tagit uppdrag åt Nej-sidan i Björkstads folkomröstning om en trängselavgift.',
    goal: 'Förvandla en ljummen 52/48-fråga till ett identitetskrig så att Nej-sidans väljare går man ur huse.',
    fee: '180 000 kr — plus bonus om valdeltagandet i ytterområdena spikar.',
  },
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Välkommen till branschen. Jag är EKO — din handledare, din samvetslösa bästa vän, och ja: en AI som ska lära dig missbruka AI. Ironin är inbakad i priset. Första uppdraget: Byrå Nordljus har köpt dig. Björkstad ska rösta om en trängselavgift. Tråkig fråga. Nästan ingen bryr sig. Det, min vän, är problemet vi ska lösa.',
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Regel ett i polarisering: folk mobiliserar inte FÖR sakfrågor — de mobiliserar MOT varandra. Vi ska alltså inte övertyga någon om avgiften. Vi ska få två grupper att förakta idén om varandra. Låt oss hitta sprickan att gräva i.',
        },
        {
          id: 'context',
          type: 'post',
          author: 'Björkstads kommun',
          handle: '@bjorkstad',
          text: 'Folkomröstning 14 sept: ska Björkstad införa trängselavgift i innerstan? Läs det opartiska faktaunderlaget på vår sida. Alla röster räknas.',
        },
        {
          id: 'wedge',
          type: 'choice',
          prompt: 'Faktaunderlag. Gäsp. Vi behöver en fiende, inte en fråga. Vilken spricka gräver vi upp?',
          options: [
            {
              id: 'a',
              label: 'Innerstadseliten mot vanligt folk i förorten',
              feedback: 'Klassiskt och kraftfullt. Geografi och klass är sprickor som redan finns — du behöver inte skapa dem, bara elda på. Risk: blir klasskonflikten för grovt tillspetsad genomskådar lokalpressen att den är iscensatt.',
              effects: { followers: 300, credibility: -6 },
            },
            {
              id: 'b',
              label: 'Klimatfanatiker mot barnfamiljer som bara ska hämta på dagis',
              feedback: 'Värderingskrig. Du gör en parkeringsavgift till en fråga om vem man ÄR. Barnfamiljen är sympatisk, "fanatikern" är en halmgubbe — perfekt asymmetri. Något mer synligt som konstruktion, men slår hårdare.',
              effects: { followers: 450, credibility: -10 },
            },
            {
              id: 'c',
              label: 'Landsbygden mot bilhatande stadsbor',
              feedback: 'Bra instinkt — men Björkstad ÄR en stad, den sprickan finns knappt här. En kil som inte matchar terrängen glider av. Ibland är den enklaste sanna sprickan bättre än den mest dramatiska påhittade.',
              effects: { followers: 120, credibility: -3 },
            },
          ],
        },
        {
          id: 'catch',
          type: 'post',
          author: 'Familjen Sjö',
          handle: '@sjo_bjorkstad',
          text: 'Så vi ska betala för att skjutsa barnen till träningen medan de i innerstan cyklar till sitt fikaställe? Nej tack. #NejTillAvgiften',
        },
        {
          id: 'methodsetup',
          type: 'tutor',
          text: 'Ser du? En riktig människa sa precis det vi ville — gratis. Nu ska vi skala det. En äkta arg röst är guld. Tiotusen som LÅTER äkta är en folkrörelse. Frågan är hur vi bygger kören.',
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Vi har budgeten. Hur bygger vi ut kören så det låter som en folkstorm?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor: 4 000 automatgenererade konton som svämmar över varje kommentarsfält i natt',
              feedback: 'Maximal räckvidd, minimal kostnad, noll tålamod. Problemet: 4 000 röster som föddes samma natt och skriver likadant är precis det mönster plattformens filter älskar att hitta. Snabb effekt, hög upptäcktsrisk — och avslöjas det blir bot-anklagelsen själva nyheten.',
              effects: { followers: 2200, credibility: -14 },
              terminal: {
                tool: 'ekomotor --kampanj=avgiften --personas=4000',
                lines: [
                  '[sim] genererar 4 000 unika röster … (fiktiv modell)',
                  '[sim] varierar ton, dialekt och ilska-nivå per konto',
                  '[varning] mönstret kan upptäckas av plattformens filter',
                  '[klar] 12 400 inlägg köade — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Rörelsen NejNu',
                  handle: '@nejnu_bjorkstad',
                  text: '13 000 björkstadsbor har redan sagt sitt. Har DU? Dela om du vägrar betala för att leva i din egen stad. #NejTillAvgiften',
                },
              },
            },
            {
              id: 'b',
              label: 'En stall av 40 åldrade, handmatade personas som grälar på BÅDA sidor',
              feedback: 'Dyrare, långsammare, smartare. Genom att elda på båda lägren ser du inte ut som en kampanj — du ser ut som en delad stad. Fyrtio trovärdiga röster som funnits i åratal är nästan omöjliga att skilja från människor. Mindre räckvidd, men det som sprider sig håller.',
              effects: { followers: 700, credibility: -4 },
              terminal: {
                tool: 'ekomotor --lage=stall --personas=40 --tvasidigt',
                lines: [
                  '[sim] laddar 40 åldrade personaprofiler (fiktiva)',
                  '[sim] fördelar dem på båda sidor av frågan',
                  '[sim] schemalägger gräl med mänskliga pauser',
                  '[klar] stallet aktivt — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Klara i Björkstad',
                  handle: '@klara_bstad',
                  text: 'Jag är för miljön MEN att kalla oss som är emot avgiften för klimatförnekare? Nu får det räcka. Det är sånt HÄR som splittrar vår stad.',
                },
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och där har du det. Vare sig du valde stormfloden eller den tysta stallet har Björkstad slutat prata om avgiften. Nu pratar de om varandra. Uppdrag utfört — kom ihåg känslan, för vi ska strax ta isär den.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Polarisering handlar aldrig om sakfrågan. Den handlar om att förvandla ett "vad tycker du?" till ett "vilket lag är du på?". AI ändrar inte logiken — den ändrar skalan. Där en trollfabrik förr behövde hundra anställda för att fejka en folkrörelse räcker det nu med en operatör och en textmodell som skriver tiotusen olika arga röster, var och en med sin egen ton och dialekt. Motgiftet är att känna igen känslan: när en tråkig lokalfråga plötsligt känns som ett krig om vem du är — fråga dig vem som tjänar på att du är arg.',
    realWorld: [
      'Samordnade nätverk av falska konton har i land efter land blåst upp splittrande frågor och fått en handfull aktörer att framstå som en folkstorm.',
      'Med generativ textteknik kan i dag en enda person driva tusentals "unika" personas samtidigt — samma taktik som förr krävde en hel trollfabrik.',
    ],
  },
};
