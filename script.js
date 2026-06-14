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
// 🥠 LYCKOKAKA (daglig stabilitet)
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
    "Allt börjar med något litet."
];


// ===============================
// 🪨 LUGNSTEN (känslosystem per skanning)
// ===============================

// 🌿 call (start / närvaro)
const calmCallQuotes = [
    "En ny dag. Du behöver inte ha bråttom in i den.",
    "Börja mjukt.",
    "Det räcker att ta första steget.",
    "Du får vara här utan att göra något mer."
];

// 🤝 social (prestationsoro / obekvämhet)
const calmSocialQuotes = [
    "Du behöver inte prestera här.",
    "Du får ta det i din egen takt.",
    "Du behöver inte säga rätt saker.",
    "Det räcker att du är här.",
    "Du behöver inte vara på ett visst sätt."
];

// 🪨 reset (kväll / släppa dagen)
const calmResetQuotes = [
    "Dagen är redan tillräcklig.",
    "Du behöver inte lösa något mer idag.",
    "Låt det som varit få vila nu.",
    "Du får släppa taget om resten.",
    "Det räcker att dagen får vara som den var.",
    "Du är klar för idag."
];


// ===============================
// 📊 LUGNSTEN – ingen “dag-cache”, bara session-minne
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
// 🥠 LYCKOKAKA – DAGLIGT CACHAT
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

    const quote = randomQuote(activeQuotes);
    localStorage.setItem(key, quote);

    return quote;
}


// ===============================
// 🪨 LUGNSTEN – NYTT VID VARJE SKANNING
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
        const quote = randomQuote(activeQuotes);
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
