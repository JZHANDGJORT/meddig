const quotes = [
    "Varje liten handling formar framtiden.",
    "Tålamod öppnar fler dörrar än stress.",
    "Små steg kan leda långt.",
    "Den som vågar fråga lär sig snabbare.",
    "Det du söker söker också dig.",
    "Ett leende kan förändra en dag.",
    "Lyckan hittar ofta den som inte jagar den.",

    "Det som tar tid blir ofta bättre.",
    "Du behöver inte förstå allt idag.",
    "Det finns styrka i att vänta.",
    "Det enkla är ofta det svåra.",
    "Det som växer långsamt får djupa rötter.",
    "En kopp te kan vara nog.",
    "Små glädjeämnen räknas också.",
    "Vardagen är större än den verkar.",
    "Du får vila innan du är färdig.",
    "Allt behöver inte ske idag.",
    "Vila är också en handling.",
    "Du får ta det lugnt utan att förtjäna det först.",
    "Mjukhet är inte svaghet.",
    "Var lika vänlig mot dig själv som mot andra.",
    "Tacksamhet gör livet större.",
    "Lägg märke till det som redan finns.",
    "Det finns mer framför dig än bakom dig.",
    "Små förändringar kan bli stora med tiden.",
    "Du behöver inte se hela vägen för att ta nästa steg.",
    "Ljuset kommer tillbaka, även efter långa vintrar.",
    "Du har klarat svåra dagar förut.",
    "Framtiden är inte färdigskriven.",
    "Det finns fler möjligheter än du ser just nu.",
    "Allt börjar med något litet.",
    "Ibland räcker det att fortsätta.",

    "Det du uppmärksammar växer.",
    "Du behöver inte ha alla svar för att börja.",
    "Stillhet kan också vara framsteg.",
    "Det blir ofta enklare än det känns i början.",
    "Du är inte sen, du är på väg.",
    "Det du gör ofta blir viktigare än det du gör ibland.",
    "All förändring börjar med en liten riktning.",
    "Det är okej att inte ha bråttom.",
    "Det som känns stort idag blir mindre med tiden.",
    "Du kan alltid börja om, men inte från samma plats.",
    "Det som är menat att stanna kräver inte att du stressar.",
    "Du behöver inte bära allt samtidigt.",
    "Det finns värde i det du redan gör.",
    "En paus kan ge mer än en push.",
    "Det är okej att göra saker i din egen takt.",
    "Du får ändra dig längs vägen.",
    "Det du övar på blir du bättre på.",
    "Fokus på en sak i taget gör allt lättare.",
    "Det som är enkelt underskattas ofta.",
    "Du växer även när det inte känns så.",
    "Allt behöver inte vara perfekt för att vara bra.",
    "Det du återkommer till formar ditt liv.",
    "Du behöver inte vara klar för att vara på rätt väg.",
    "Det som känns svårt är ofta där du växer mest.",
    "Små beslut varje dag styr större riktningar än enstaka stora beslut.",
    "Du får börja där du är, inte där du tycker du borde vara.",
    "Det är okej att inte känna sig redo.",
    "Du gör mer framsteg än du märker.",
    "Det som känns stillastående kan vara en omställning.",
    "Det viktiga är inte tempot utan riktningen.",
    "Du behöver inte kontrollera allt för att det ska bli bra.",
    "Det du släpper taget om frigör plats för något nytt.",
    "Du behöver inte göra allt själv.",
    "Det som är rätt för dig behöver inte vara snabbt.",
    "Det är okej att inte veta exakt vart du är på väg.",
    "Du får vara under utveckling."
];

// 🥠 kaka-ID från URL
const params = new URLSearchParams(window.location.search);
const deviceId = params.get("id") || "kaka01";

// 📅 dagens datum
function getDate() {
    return new Date().toISOString().split("T")[0];
}

// 🔑 nycklar
function dailyKey() {
    return `${deviceId}-daily-${getDate()}`;
}

function firstKey() {
    return `${deviceId}-first`;
}

// 🎲 slumpa citat
function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// 🌿 hämta dagens citat (stabilt per kaka + dag)
function getDailyQuote() {
    const key = dailyKey();
    const saved = localStorage.getItem(key);

    if (saved) return saved;

    const quote = randomQuote();
    localStorage.setItem(key, quote);
    return quote;
}

// 🌱 första skanning-logik
function handleFirstScan() {
    const key = firstKey();
    const isFirst = !localStorage.getItem(key);

    if (isFirst) {
        localStorage.setItem(key, "seen");
        return true;
    }

    return false;
}

// 🌿 uppdatera visuellt
function updateQuote(quote) {
    const quoteEl = document.getElementById("quote");

    quoteEl.classList.remove("show");

    setTimeout(() => {
        quoteEl.textContent = quote;

        requestAnimationFrame(() => {
            setTimeout(() => {
                quoteEl.classList.add("show");
            }, 120);
        });

    }, 650);
}

// 🔁 byt citat manuellt
function newQuote() {
    const quote = randomQuote();
    localStorage.setItem(dailyKey(), quote);
    updateQuote(quote);
}

// 🌿 START
(function init() {
    const quote = getDailyQuote();

    // första skanning (framtida hook)
    handleFirstScan();

    updateQuote(quote);
})();
