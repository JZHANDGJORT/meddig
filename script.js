// ===============================
// 🥠 LYCKOKAKA (perspektiv)
// ===============================
const wisdomQuotes = [
    "Varje liten handling formar framtiden.",
    "Tålamod öppnar fler dörrar än stress.",
    "Små steg kan leda långt.",
    "Det som växer långsamt får djupa rötter.",
    "Du behöver inte förstå allt idag.",
    "Vardagen är större än den verkar.",
    "Små glädjeämnen räknas också.",
    "Något gott kan fortfarande hända idag.",
    "Framtiden är inte färdigskriven.",
    "Det finns fler möjligheter än du ser just nu.",
    "Du behöver inte se hela vägen för att ta nästa steg.",
    "Ljuset kommer tillbaka, även efter långa vintrar.",
    "Allt börjar med något litet."
];


// ===============================
// 🪨 LUGNSTEN (trygghet / närvaro)
// ===============================
const calmQuotes = [
    // grundtrygghet
    "Du behöver inte lösa allt just nu.",
    "Låt axlarna sjunka en aning.",
    "Du är trygg här och nu.",
    "Allt behöver inte bli klart idag.",
    "Du får finnas precis som du är.",
    "Du behöver inte skynda.",
    "En sak i taget räcker.",
    "Det är inte bråttom.",

    // social / prestationsoro (din riktning)
    "Du behöver inte prestera här.",
    "Du får vara lite obekväm just nu.",
    "Det här ögonblicket behöver inte bli perfekt.",
    "Du måste inte säga rätt saker.",

    // återkomst / relation
    "Du är här igen.",
    "Samma stund. Samma plats.",
    "Du behöver inte göra mer än att vara här.",
    "Vi fortsätter här."
];


// ===============================
// 🔗 ID
// ===============================
const params = new URLSearchParams(window.location.search);
const deviceId = params.get("id") || "lyckokaka01";


// ===============================
// 🧠 LUGNSTENENS PERSONLIGHET
// ===============================
let activeQuotes;
let subtitleText = "";

// 📊 Lugnstenens “relation över tid”
function getVisitCount() {
    const key = `${deviceId}-visits`;
    let count = localStorage.getItem(key);

    count = count ? parseInt(count) : 0;
    count++;

    localStorage.setItem(key, count);
    return count;
}


// ===============================
// 🎯 VÄLJ TYP + PERSONLIGHET
// ===============================
let visitCount = 0;

if (deviceId.startsWith("lugnsten")) {

    activeQuotes = calmQuotes;

    visitCount = getVisitCount();

    if (visitCount === 1) {
        subtitleText = "En liten trygghet i fickan";
    } else if (visitCount < 5) {
        subtitleText = "En liten trygghet i fickan";
    } else {
        subtitleText = "En liten trygghet i fickan · vi har setts förr";
    }

} else {

    activeQuotes = wisdomQuotes;
    subtitleText = "En tanke att bära med sig";
}


// ===============================
// 📅 DAGLIGT CACHAT CITAT
// ===============================
function getDate() {
    return new Date().toISOString().split("T")[0];
}

function dailyKey() {
    return `${deviceId}-daily-${getDate()}`;
}

function randomQuote() {
    return activeQuotes[
        Math.floor(Math.random() * activeQuotes.length)
    ];
}

function getDailyQuote() {
    const key = dailyKey();
    const saved = localStorage.getItem(key);

    if (saved) return saved;

    const quote = randomQuote();
    localStorage.setItem(key, quote);

    return quote;
}


// ===============================
// ✨ UI
// ===============================
function updateQuote(quote) {
    const quoteEl = document.getElementById("quote");

    quoteEl.classList.remove("show");

    setTimeout(() => {
        quoteEl.textContent = quote;
        quoteEl.classList.add("show");
    }, 300);
}

function newQuote() {
    const quote = randomQuote();
    localStorage.setItem(dailyKey(), quote);
    updateQuote(quote);
}


// ===============================
// 🚀 START
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("subtitle").textContent = subtitleText;

    updateQuote(getDailyQuote());

});
