// ===============================
// 🔗 ID
// ===============================
const params = new URLSearchParams(window.location.search);
const deviceId = params.get("id") || "lyckokaka01";


// ===============================
// ⏰ TID PÅ DYGNET
// ===============================
function getTimeOfDay() {
    const hour = new Date().getHours();

    if (hour < 10) return "morning";
    if (hour < 18) return "day";
    return "evening";
}


// ===============================
// 🥠 LYCKOKAKA
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
    "Du behöver inte se hela vägen för att ta nästa steg.",
    "Ljuset kommer tillbaka, även efter långa vintrar.",
    "Allt börjar med något litet.",
    "Det du gör nu spelar roll, även om det känns litet.",
    "Du behöver inte ha allt klart för att börja.",
    "Det enkla är ofta det som håller längst.",
    "Det är okej att inte veta än.",
    "Små förändringar kan göra stor skillnad över tid.",
    "Du är redan på väg.",
    "Det finns tid att förstå senare.",
    "Inte allt behöver lösas idag.",
    "Du ser inte hela bilden än.",
    "Det du söker kan ta en annan väg till dig.",
    "Stanna lite i det som är just nu.",
    "Det behöver inte bli perfekt för att vara rätt."
];


// ===============================
// 🪨 LUGNSTEN – CALL
// ===============================
const calmCallQuotes = [
    "En ny dag. Du behöver inte ha bråttom in i den.",
    "Börja mjukt.",
    "Det räcker att ta första steget.",
    "Du får vara här utan att göra något mer.",
    "Andas in lite långsammare.",
    "Du behöver inte hinna ikapp något.",
    "Det är okej att börja försiktigt.",
    "Inget måste lösas direkt nu.",
    "Du kan få vakna i din egen takt.",
    "Det finns inget du behöver bevisa här."
];


// ===============================
// 🤝 LUGNSTEN – SOCIAL
// ===============================
const calmSocialQuotes = [
    "Du behöver inte prestera här.",
    "Du får ta det i din egen takt.",
    "Du behöver inte säga rätt saker.",
    "Det räcker att du är här.",
    "Du behöver inte vara på ett visst sätt.",
    "Du behöver inte passa in perfekt.",
    "Det är okej att vara lite obekväm.",
    "Du kan få vara tyst om du vill.",
    "Du behöver inte göra intryck.",
    "Du får ta plats på ditt eget sätt.",
    "Det är okej att bara observera."
];


// ===============================
// 🪨 LUGNSTEN – RESET
// ===============================
const calmResetQuotes = [
    "Dagen är redan tillräcklig.",
    "Du behöver inte lösa något mer idag.",
    "Låt det som varit få vila nu.",
    "Du får släppa taget om resten.",
    "Det räcker att dagen får vara som den var.",
    "Du är klar för idag.",
    "Du kan lägga ner dagen här.",
    "Inget mer behöver bearbetas nu.",
    "Du får vila från tankarna en stund.",
    "Det är okej att stänga ner nu.",
    "Du behöver inte ta med allt vidare."
];


// ===============================
// 🪨 LUGNSTEN – STATE
// ===============================
let lastLullQuote = null;


// ===============================
// 🔗 HELPERS
// ===============================
function randomQuote(list) {
    return list[Math.floor(Math.random() * list.length)];
}


// ===============================
// 🎯 VÄLJ INNEHÅLL
// ===============================
let activeQuotes = [];
let subtitleText = "";

// Lugnsten-logik
if (deviceId.startsWith("lugnsten")) {

    const timeOfDay = getTimeOfDay();

    if (timeOfDay === "morning") {
        activeQuotes = calmCallQuotes;
    } else if (timeOfDay === "evening") {
        activeQuotes = calmResetQuotes;
    } else {
        activeQuotes = calmSocialQuotes;
    }

    subtitleText = "En liten trygghet i fickan";

} else {
    activeQuotes = wisdomQuotes;
    subtitleText = "Ord för stunden";
}


// ===============================
// 🥠 LYCKOKAKA – DAGLIGT
// ===============================
function getDate() {
    return new Date().toISOString().split("T")[0];
}

function dailyKey() {
    return `${deviceId}-daily-${getDate()}`;
}

function getDailyQuote() {
    const key = dailyKey();
    const saved = localStorage.getItem(key);

    if (saved) return saved;

    const quote = randomQuote(wisdomQuotes);
    localStorage.setItem(key, quote);

    return quote;
}


// ===============================
// 🪨 LUGNSTEN – NYTT VID SKANNING
// ===============================
function getLullQuote() {
    let quote;

    do {
        quote = randomQuote(activeQuotes);
    } while (quote === lastLullQuote && activeQuotes.length > 1);

    lastLullQuote = quote;
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
    if (deviceId.startsWith("lugnsten")) {
        updateQuote(getLullQuote());
    } else {
        const quote = randomQuote(wisdomQuotes);
        localStorage.setItem(dailyKey(), quote);
        updateQuote(quote);
    }
}


// ===============================
// 🚀 START
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("subtitle").textContent = subtitleText;

    if (deviceId.startsWith("lugnsten")) {
        updateQuote(getLullQuote());
    } else {
        updateQuote(getDailyQuote());
    }

});
