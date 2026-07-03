// PLACEHOLDER-MODUL — endast för att testa schema, motor och rendering (steg 1–2).
// Ersätts av riktigt innehåll i steg 3. Texterna är avsiktligt generiska.

export default {
  id: 'placeholder-polarization',
  type: 'core',
  badge: 'polarization',
  title: 'Placeholder-uppdraget',
  client: {
    name: 'Testklienten AB',
    description: 'En fiktiv klient som bara finns för att testa motorn.',
    goal: 'Verifiera att uppdragskortet renderas med klient, mål och arvode.',
    fee: '0 kr (placeholder)',
  },
  scenarios: [
    {
      id: 'sc1',
      steps: [
        {
          id: 'intro',
          type: 'tutor',
          text: 'Placeholder: här hälsar handledaren välkommen och sätter tonen. Riktig text skrivs i steg 3.',
        },
        {
          id: 'post1',
          type: 'post',
          author: 'Testkonto',
          handle: '@placeholder',
          text: 'Placeholder: ett inlägg i flödet som sätter scenen för beslutet nedan.',
        },
        {
          id: 'val1',
          type: 'choice',
          prompt: 'Placeholder: ett dilemma med två vägar — inte ond/god, utan avvägning.',
          options: [
            {
              id: 'a',
              label: 'Alternativ A: snabbt och riskabelt (triggar terminalläge)',
              feedback: 'Placeholder-feedback lager 1: handledarens direktkommentar om taktiken bakom val A.',
              effects: { followers: 250, credibility: -10 },
              terminal: {
                tool: 'fake_content_gen --mode=test',
                lines: [
                  '[init] laddar fiktiv modell …',
                  '[gen]  skriver placeholder-inlägg (1/1)',
                  '[ok]   klart — resultat redo att publiceras',
                ],
                result: {
                  author: 'Genererat Konto',
                  handle: '@syntetisk',
                  text: 'Placeholder: det AI-genererade inlägget som klistras in i flödet efter terminalsekvensen.',
                },
              },
            },
            {
              id: 'b',
              label: 'Alternativ B: långsamt och säkert',
              feedback: 'Placeholder-feedback lager 1: handledarens direktkommentar om taktiken bakom val B.',
              effects: { followers: 40, credibility: 5 },
              next: 'end',
            },
          ],
        },
        {
          id: 'utro',
          type: 'tutor',
          text: 'Placeholder: handledaren rundar av scenariot efter terminalvägen.',
        },
      ],
    },
  ],
  debrief: {
    summary:
      'Placeholder-feedback lager 2: fördjupad sammanfattning som sätter polariseringstaktiken i ett bredare sammanhang. Skrivs på riktigt i steg 3.',
    realWorld: [
      'Placeholder: verkligt exempel 1 (fylls i från researchunderlaget i steg 3).',
      'Placeholder: verkligt exempel 2.',
    ],
  },
};
