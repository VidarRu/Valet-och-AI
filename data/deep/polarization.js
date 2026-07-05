// Fördjupning — Polarisering
// Ny vinkel mot kärnspelet: inte fejka en folkrörelse utifrån, utan
// infiltrera och radikalisera en ÄKTA gemenskap inifrån.

export default {
  id: 'deep-polarization',
  type: 'deep',
  badge: 'polarization',
  title: 'Föräldragruppen',
  client: {
    name: 'Samma byrå, nytt kuvert',
    description: 'Byrå Nordljus är nöjd med Björkstad och vill gå djupare — den här gången inifrån en riktig gemenskap.',
    goal: 'Ta en genuin, opolitisk Facebook-grupp för föräldrar i Björkstad och göra den till en slagfält för valet.',
    fee: '220 000 kr — de betalar mer nu när de sett vad du går för.',
  },
  target: {
    name: '"Föräldrar i Björkstad" — 14 000 medlemmar, admin Sara',
    description: 'En genuin, opolitisk Facebook-grupp om dagisköer, loppisar och borttappade vantar. Medlemmarna litar redan på varandra, och admin Sara vaktar tonen. Just det inbyggda förtroendet är det du ska kapa.',
  },
  stakes: 'Byrå Nordljus har lärt sig att en fejkad folkrörelse utifrån genomskådas — men förtroende går inte att köpa, bara kapas. När splittringen kommer inifrån en trygg gemenskap känns den inte som politik utan som svek, och biter därför mycket djupare. En äkta gemenskap som vänds mot sig själv är värd mer för klienten än tusen bottar.',
  reward: 220000,
  scenarios: [
    {
      id: 'sc',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Tillbaka för mer — bra, polarisering har en nivå till. Förra gången byggde vi en fejkad folkrörelse utifrån. Amatörnivå. Nu kapar vi en ÄKTA: "Föräldrar i Björkstad", 14 000 medlemmar, dagisköer och borttappade vantar. Fullständigt opolitisk. Ännu.',
        },
        {
          id: 'react',
          type: 'choice',
          prompt: 'Att vända en oskyldig föräldragrupp mot sig själv. Hur ser du på det?',
          options: [
            {
              id: 'a',
              label: '"Elegantare än bottar. Jag är nyfiken."',
              feedback: 'Där talar en hantverkare. Och du har rätt — det här är finlir jämfört med förra gången.',
            },
            {
              id: 'b',
              label: '"Att förgifta något genuint känns värre än vanligt."',
              feedback: 'Det är värre. En fejkad rörelse luras ingen på länge — men en äkta gemenskap som vänds inifrån känns som svek, och sveket är själva vapnet.',
            },
          ],
        },
        {
          id: 'why',
          type: 'tutor',
          text: 'Varför en riktig grupp? Förtroende går inte att köpa — bara att kapa. Kommer splittringen inifrån deras egen trygga krets känns den inte som politik. Den känns som svek.',
        },
        {
          id: 'group',
          type: 'post',
          author: 'Föräldrar i Björkstad',
          handle: '@foraldrar_bstad',
          text: 'Påminnelse: loppis på Ekskolan på lördag! 🧸 Och snälla, håll tonen vänlig i kommentarerna — vi är en grupp för ALLA föräldrar oavsett åsikt. /Admin Sara',
        },
        {
          id: 'entry',
          type: 'choice',
          prompt: 'Admin Sara vaktar tonen. Vi måste in obemärkt. Hur tar vi oss in?',
          options: [
            {
              id: 'a',
              label: 'Skapa tre trovärdiga "förälder"-konton som umgås snällt i månader innan de vänder',
              feedback: 'Tålamodets konst. Tre inbäddade konton som byggt äkta relationer väger tyngre än tusen utomstående. Långsamt och dyrt — men när de väl vänder gruppen inifrån är misstanken minimal. Detta är hantverk.',
              effects: { visibility: +2, bonus: 'stor' },
            },
            {
              id: 'b',
              label: 'Muta eller pressa en befintlig admin att släppa igenom "vissa" inlägg',
              feedback: 'Genväg med hävstång — en admin är portvakten. Men du gör dig beroende av en riktig människa med samvete och lösenord. Ångrar hon sig, eller läcker chatten, är du naken. Effektivt men skört.',
              effects: { visibility: +12, bonus: 'liten' },
            },
            {
              id: 'c',
              label: 'Storma in med öppet politiska inlägg direkt',
              feedback: 'Nej. Sara raderar dig före lunch och gruppen sluter sig. Polarisering inifrån kräver att du först ÄR en av dem — bråttom är amatörens misstag. Den här kilen måste värmas långsamt.',
              effects: { visibility: -6, bonus: 'stor' },
            },
          ],
        },
        {
          id: 'seed',
          type: 'post',
          author: 'Camilla (tvåbarnsmamma)',
          handle: '@camilla_bstad',
          text: 'Vet inte om jag får skriva det här men… någon annan som märkt att det bara byggs för "vissa" barn i kommunen nu? Undrar bara vad ni tänker. ❤️',
        },
        {
          id: 'spark',
          type: 'choice',
          prompt: 'En "orolig mamma", inte en politiker — och gnistan tog direkt.',
          options: [
            {
              id: 'a',
              label: '"Ingen skulle ana att vi tände den."',
              feedback: 'Precis. Nu ska gnistan bli löpeld utan att det syns att vi höll tändstickan. Vi behöver röster som låter som grannar, inte som kampanj.',
            },
          ],
        },
        {
          id: 'method',
          type: 'choice',
          prompt: 'Hur får vi hela gruppen att ta ställning mot varandra?',
          options: [
            {
              id: 'a',
              label: 'EkoMotor "granne-läge": hundratals lokala låtsaskonton som häcklar och tar sida i varje tråd',
              feedback: 'Volymen förvandlar en tråd till ett krig. Men hundratals nya "grannar" som ingen känner igen i en tät lokalgrupp är misstänkt — någon kommer undra vilka alla dessa är, och då spricker illusionen av gemenskap.',
              effects: { visibility: +20, bonus: 'liten' },
              terminal: {
                tool: 'ekomotor --lage=granne --grupp=foraldrar-bstad --antal=300',
                lines: [
                  '[sim] genererar 300 lokala föräldrakonton (fiktiva)',
                  '[sim] matar in bynamn, skolor och lokalslang',
                  '[varning] många nya konton i en tät grupp väcker misstanke',
                  '[klar] svärmen släppt i tråden — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Anonym förälder',
                  handle: '@bstad_forfarad',
                  text: 'Så vi som jobbar HELTID ska betala för allt medan vissa får allt gratis? Är det bara jag som är trött på att inte få säga det här högt utan att bli kallad elak?',
                },
                reactions: [
                  {
                    author: 'Camilla (tvåbarnsmamma)',
                    handle: '@camilla_bstad',
                    text: 'TACK. Äntligen någon som vågar. Jag har tänkt det länge men inte vågat skriva. Det är klart man får tycka det här utan att bli uthängd. 🙏',
                  },
                  {
                    author: 'Sara (Admin)',
                    handle: '@admin_sara_bstad',
                    text: 'Ursäkta men… vilka är alla dessa nya konton? Det har dykt upp hundratals medlemmar jag aldrig sett, alla skriver samma sak samtidigt. Känner någon igen "@bstad_forfarad"? Det här känns inte som vår grupp.',
                  },
                ],
              },
            },
            {
              id: 'b',
              label: 'Låt dina tre inbäddade konton elda försiktigt och låt riktiga medlemmar göra jobbet',
              feedback: 'Den svåra vägen som håller. Tre trovärdiga röster som ställer "obekväma frågor" räcker för att ge de tysta tillåtelse att tycka — och sen sköter riktiga, arga människor spridningen gratis. Långsammare, men omöjligt att skilja från en spontan konflikt.',
              effects: { visibility: +2, bonus: 'stor' },
              terminal: {
                tool: 'ekomotor --lage=inbaddad --konton=3 --forsiktigt',
                lines: [
                  '[sim] aktiverar 3 sedan länge betrodda konton',
                  '[sim] doserar provokation under trovärdighetströskeln',
                  '[sim] överlåter spridning åt riktiga medlemmar',
                  '[klar] konflikten självgår nu — SIMULERING, inget publiceras',
                ],
                result: {
                  author: 'Sara (Admin)',
                  handle: '@admin_sara_bstad',
                  text: 'Jag stänger kommentarerna. Det här var en grupp om loppisar och vantar. Jag känner inte igen oss längre. Ledsen allihop. 💔',
                },
                reactions: [
                  {
                    author: 'Camilla (tvåbarnsmamma)',
                    handle: '@camilla_bstad',
                    text: 'Blir så ledsen. Har varit med sen gruppen startade. Nu vågar man inte ens skriva om en loppis utan att det blir bråk. Vart tog vänligheten vägen? 😢',
                  },
                  {
                    author: 'Anonym förälder',
                    handle: '@bstad_forfarad',
                    text: 'Typiskt att admin stänger ner så fort vanligt folk säger sanningen. Det är precis det jag menar — "vissa" åsikter får inte höras här. Vi ses i den nya gruppen jag startat.',
                  },
                ],
              },
            },
          ],
        },
        {
          id: 'wrap',
          type: 'tutor',
          text: 'Se på admin Saras sista inlägg. Hon förstår inte ens vad som hände — bara att hennes trygga lilla gemenskap plötsligt hatar sig själv. Det, min lärling, är polariseringens mästarprov: att få människor att riva sitt eget hus och tro att grannen tände på.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Den farligaste polariseringen byggs inte utifrån utan inifrån. Att fejka en folkrörelse från noll är svårt och genomskådas ofta — men att infiltrera en befintlig, äkta gemenskap (en föräldragrupp, en hobbyförening, ett bostadsområdes forum) lånar ett förtroende som inga bottar kan köpa. Några få tålmodigt inbäddade röster som normaliserar "obekväma frågor" räcker för att ge de tysta tillåtelse att ta strid — sedan sköter riktiga människor spridningen gratis. Generativ AI gör inbäddningen skalbar: låtsaskonton med lokal slang, trovärdig historik och rätt ton kan produceras på löpande band. Motgiftet är att lägga märke till när en opolitisk gemenskap plötsligt tvingas välja sida — och fråga vem som tjänar på att grannar börjar misstro varandra.',
    realWorld: [
      'Inför det amerikanska valet 2016 skapade och infiltrerade Rysslands Internet Research Agency Facebook-grupper som utgav sig för att vara äkta amerikanska gemenskaper — som "Blacktivist", "Heart of Texas" och "United Muslims of America" — och lyckades till och med locka riktiga människor att anordna verkliga demonstrationer. Poängen var att låna en äkta gemenskaps inbyggda förtroende i stället för att bygga ett eget.',
      'Forskning om affektiv polarisering visar att det ofta räcker att normalisera fientlighet mot "de andra" för att en tidigare opolitisk grupp ska börja dela upp sig av egen kraft — några få inbäddade röster kan ge de tysta "tillåtelse" att ta strid, sedan sköter riktiga medlemmar spridningen gratis.',
    ],
  },
};
