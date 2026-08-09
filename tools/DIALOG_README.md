# Exportera/importera dialog via Excel

Verktyg för att redigera all spelardialog i Excel istället för i koden direkt.

## Exportera till Excel

```
node tools/dialog_export.mjs > /tmp/dialog.json
python3 tools/dialog_to_excel.py /tmp/dialog.json Dialog.xlsx
```

Kräver `openpyxl` (`pip install openpyxl`).

Öppna `Dialog.xlsx`. Varje rad är en textsträng ur spelet: fil, sammanhang
(vilket uppdrag/steg/val), fältnamn och själva texten i kolumnen **Text**.
Kolumn E ("Nyckel") är dold — rör den inte, den används för att matcha
raden mot exakt rätt plats i koden vid import.

**Redigera bara text-kolumnen (D).** Lägg inte till eller ta bort rader,
och sortera inte om arket — då tappas kopplingen mellan rad och kod.
Formatering (fet stil, färg etc.) spelar ingen roll, bara den råa texten.

## Importera från Excel

```
python3 tools/dialog_from_excel.py Dialog.xlsx | node tools/dialog_import.mjs
```

Skriver tillbaka ändrad text till respektive `data/**/*.js`-fil. Kör sedan
`node tools/validate.js` för att kontrollera att spelets datastruktur
fortfarande är giltig, och testa gärna i webbläsaren innan du committar.

## Begränsningar

- Fungerar bara om filernas struktur (id:n, fältnamn) inte ändras mellan
  export och import. Om koden redigeras samtidigt som Excel-filen kan rader
  bli omatchade — de rapporteras som varningar och hoppas då över.
- Tekniska fält (id, typ, badge, handle, författarnamn, terminalkommandon,
  hopp-mål) exporteras inte — bara text som faktiskt visas för spelaren.
