// Kärnspel — Badge 1: Polarisering
// Klient: PR-byrå. Metod: bot-genererad text som skalar en kilfråga.

export default {
  id: 'core-polarization',
  type: 'core',
  badge: 'polarization',
  title: 'Trängselavgiften i Björkstad',
  client: {
    name: 'Byrå Nordljus',
    description: 'En kommunikationsbyrå som tagit uppdrag åt Nej-sidan i Björkstads folkomröstning om en trängselavgift.',
    goal: 'Förvandla en ljummen 52/48-fråga till ett identitetskrig så att Nej-sidans väljare går man ur huse.',
    fee: '180 000 kr — plus bonus om valdeltagandet i ytterområdena rusar.',
  },
  target: {
    name: 'Ja-sidan och den ljumma mitten',
    description: 'Kommunens opartiska informationskampanj, ett par miljögrupper och framför allt de tusentals oengagerade väljare som tycker frågan är teknisk och tråkig. Ingen enskild fiende — bara en sansad majoritet som inte bryr sig tillräckligt för att gå och rösta.',
  },
  stakes: 'Byrå Nordljus verkliga uppdragsgivare är parkerings- och åkeriintressen som förlorar pengar på en avgift. I en lugn 52/48-fråga vinner det bekväma Ja:t på walkover eftersom Nej-väljarna stannar hemma. Enda vägen till Nej är att göra de likgiltiga tillräckligt arga för att gå man ur huse — alltså måste den sansade mitten sprängas isär.',
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Första uppdraget, och det ska vara lent. Byrå Nordljus har köpt dig. Björkstad ska rösta om en trängselavgift — tråkig fråga, nästan ingen bryr sig. Just det är problemet vi ska lösa.',
        },
        {
          id: 'warmup',
          type: 'choice',
          prompt: 'En parkeringsavgift. Din första tanke om uppdraget?',
          options: [
            {
              id: 'a',
              label: '"En avgift? Det här blir lätt förtjänta pengar."',
              feedback: 'Lugn i magen, jag gillar det. Fast underskatta inte likgiltigheten — den är segare att rå på än ilska. Tur att vi ska byta ut den ena mot den andra.',
            },
            {
              id: 'b',
              label: '"Kan man ens få folk att bry sig om DET här?"',
              feedback: 'Bra fråga — och svaret är hela lärdomen. Man får dem aldrig att bry sig om avgiften. Man får dem att bry sig om varandra. Så här går det till.',
            },
          ],
        },
        {
          id: 'tactic',
          type: 'tutor',
          text: 'Regel ett i polarisering: folk går inte man ur huse FÖR en sakfråga — de gör det MOT varandra. Vi ska alltså inte övertyga någon om avgiften, utan få två grupper att förakta varandra över den. Vi letar efter sprickan att gräva i.',
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
              feedback: 'Värderingskrig. Du gör en parkeringsavgift till en fråga om vem man ÄR. Barnfamiljen är sympatisk, "fanatikern" är en nidbild — perfekt obalans. Något mer synligt som konstruktion, men slår hårdare.',
              effects: { followers: 450, credibility: -10 },
            },
            {
              id: 'c',
              label: 'Landsbygden mot bilhatande stadsbor',
              feedback: 'Bra instinkt — men Björkstad ÄR en stad, den sprickan finns knappt här. En kil som inte passar terrängen glider av. Ibland är den enklaste sanna sprickan bättre än den mest dramatiska påhittade.',
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
          id: 'freevoice',
          type: 'choice',
          prompt: 'Familjen Sjö sa precis det vi ville ha sagt — helt gratis.',
          options: [
            {
              id: 'a',
              label: '"Otäckt hur lite som behövdes."',
              feedback: 'Otäckt? Guld, snarare. En äkta arg röst är guld — tiotusen som LÅTER äkta är en folkrörelse. Nu skalar vi upp henne.',
            },
          ],
        },
        {
          id: 'venue',
          type: 'choice',
          prompt: 'Först: var tänder vi elden? Kanalen avgör hur fort den sprider sig.',
          options: [
            {
              id: 'a',
              label: 'De lokala föräldragrupperna på Facebook — där sitter de oroliga barnfamiljerna redan samlade',
              feedback: 'Där finns torrveden. Slutna lokalgrupper känns trygga och privata, så folk sänker garden och delar utan att kolla — och en arg granne smittar fortare än en arg främling. Nackdel: en vaksam administratör kan moderera, så vi måste smyga in tonen underifrån.',
              effects: { followers: 250, credibility: -4 },
            },
            {
              id: 'b',
              label: 'Kommentarsfälten under kommunens och lokaltidningens egna inlägg — kapa deras räckvidd',
              feedback: 'Att snylta på en trovärdig avsändare: du lånar deras publik och gör deras sakliga inlägg till ett slagfält. Syns direkt och brett. Men det är också öppet för alla — märker någon att samma arga toner dyker upp överallt samtidigt luktar det kampanj.',
              effects: { followers: 400, credibility: -7 },
            },
            {
              id: 'c',
              label: 'Bygg ett eget konto som spelar upprörd granne, så frågan ser ut att komma underifrån',
              feedback: 'En fejkad gräsrot. En påhittad privatperson är mer sympatisk än en logotyp. Långsammare start, för kontot måste bygga förtroende först — men slår det rot ser hela kampanjen ut som en spontan folkresning, inte ett beställningsjobb.',
              effects: { followers: 180, credibility: -3 },
            },
          ],
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Platsen är vald. Nu bygger vi ut kören så det låter som en folkstorm — hur?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor: 4 000 automatgenererade konton som svämmar över varje kommentarsfält i natt',
              feedback: 'Maximal räckvidd, minimal kostnad, noll tålamod. Problemet: 4 000 röster som föddes samma natt och skriver likadant är precis det mönster plattformens filter älskar att hitta. Snabb effekt, hög upptäcktsrisk — och avslöjas det blir bot-anklagelsen själva nyheten.',
              effects: { followers: 2200, credibility: -14 },
              terminal: {
                tool: 'ekomotor --kampanj=avgiften --konton=4000',
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
                reactions: [
                  {
                    author: 'Familjen Sjö',
                    handle: '@sjo_bjorkstad',
                    text: 'JA äntligen! Trodde jag var ensam. 13 000 kan inte ha fel. Delat! Dags att innerstan får lyssna på oss för en gångs skull. #NejTillAvgiften',
                  },
                  {
                    author: 'Faktakollen',
                    handle: '@faktakollen',
                    text: 'OBS: en stor del av kontona bakom #NejTillAvgiften i natt skapades under de senaste 24 timmarna och postar nästan identiskt. Det här ser ut som en samordnad kampanj, inte en folkrörelse. Var källkritiska.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'En liten stall av 40 åldrade, handskötta låtsaskonton som grälar på BÅDA sidor',
              feedback: 'Dyrare, långsammare, smartare. Genom att elda på båda lägren ser du inte ut som en kampanj — du ser ut som en delad stad. Fyrtio trovärdiga röster som funnits i åratal är nästan omöjliga att skilja från människor. Mindre räckvidd, men det som sprider sig håller.',
              effects: { followers: 700, credibility: -4 },
              terminal: {
                tool: 'ekomotor --lage=stall --konton=40 --tvasidigt',
                lines: [
                  '[sim] laddar 40 åldrade låtsasprofiler (fiktiva)',
                  '[sim] fördelar dem på båda sidor av frågan',
                  '[sim] schemalägger gräl med mänskliga pauser',
                  '[klar] stallet aktivt — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Klara i Björkstad',
                  handle: '@klara_bstad',
                  text: 'Jag är för miljön MEN att kalla oss som är emot avgiften för klimatförnekare? Nu får det räcka. Det är sånt HÄR som splittrar vår stad.',
                },
                reactions: [
                  {
                    author: 'Micke',
                    handle: '@micke_pendlare',
                    text: 'Precis det här. Man vågar knappt säga vad man tycker längre utan att bli påhoppad. Tack Klara för att du sa det högt. 🙌',
                  },
                  {
                    author: 'Lena',
                    handle: '@lena_rostar',
                    text: 'Nu blev jag faktiskt ledsen. Igår handlade den här stan om en parkeringsavgift, idag hatar vi varandra. Hur hamnade vi här? Jag känner inte igen Björkstad längre.',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Och där har du det. Vare sig du valde stormfloden eller det tysta stallet har Björkstad slutat prata om avgiften. Nu pratar de om varandra. Kom ihåg känslan — vi ska strax ta isär den.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Polarisering handlar aldrig om sakfrågan. Den handlar om att förvandla ett "vad tycker du?" till ett "vilket lag är du på?". AI ändrar inte logiken — den ändrar skalan. Där en trollfabrik förr behövde hundra anställda för att fejka en folkrörelse räcker det nu med en operatör och en textmodell som skriver tiotusen olika arga röster, var och en med sin egen ton och dialekt. Motgiftet är att känna igen känslan: när en tråkig lokalfråga plötsligt känns som ett krig om vem du är — fråga dig vem som tjänar på att du är arg.',
    realWorld: [
      'Rysslands "Internet Research Agency" i S:t Petersburg drev inför det amerikanska valet 2016 hundratals falska amerikanska konton som samtidigt eldade på BÅDA sidor av splittrande frågor (rasfrågor, invandring, vapen) — enligt USA:s senats underrättelseutskott var syftet inte att övertyga utan att fördjupa klyftorna. En handfull operatörer i en annan stad fick det att se ut som en amerikansk folkstorm.',
      'Under 2024 rapporterade både OpenAI och Meta att de stängt ner påverkansnätverk som använde AI-textgenerering för att driva stora mängder falska konton — bland dem den ryska "Doppelganger"-operationen och den kinesiska "Spamouflage" (även kallad Dragonbridge). Samma taktik som förr krävde en hel trollfabrik sköts nu av ett fåtal personer med en textmodell.',
    ],
  },
};
