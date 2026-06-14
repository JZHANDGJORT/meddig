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
    "Du är redan på väg.",
    "Det är okej att inte veta än.",
    "Små förändringar kan göra stor skillnad över tid."
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
    "Du kan få vakna i din egen takt.",
    "Det finns inget du behöver bevisa här."
];


// ===============================
// 🤝 LUGNSTEN – SOCIAL
// ===============================
const calmSocialQuotes = [
    "Du behöver inte prestera här.",
    "Du får ta det i din egen takt.",
    "Det räcker att du är här.",
    "Du behöver inte vara på ett visst sätt.",
    "Det är okej att vara lite obekväm.",
    "Du behöver inte göra intryck.",
    "Du får vara tyst om du vill.",
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
    "Det är okej att stänga ner nu.",
    "Du behöver inte ta med allt vidare."
];


// ===============================
// 🧠 STATE
// ===============================
let lastLullQuote = null;


// ===============================
// 🔗 HELPERS
// ===============================
function randomQuote(list) {
    return list[Math.floor(Math.random() * list.length)];
}


// ===============================
// 🎯 VÄLJ LUGNSTEN-LÄGE
// ===============================
function getLullList() {
    const timeOfDay = getTimeOfDay();

    if (timeOfDay === "morning") return calmCallQuotes;
    if (timeOfDay === "evening") return calmResetQuotes;
    return calmSocialQuotes;
}


// ===============================
// 🪨 LUGNSTEN – NYTT CIKTAT PER SKANNING
// ===============================
function getLullQuote() {
    const list = getLullList();

    let quote;

    do {
        quote = randomQuote(list);
    } while (quote === lastLullQuote && list.length > 1);

    lastLullQuote = quote;
    return quote;
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
    const saved = localStorage.getItem(dailyKey());

    if (saved) return saved;

    const quote = randomQuote(wisdomQuotes);
    localStorage.setItem(dailyKey(), quote);

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
    }, 200);
}


// ===============================
// 🔁 KNAPP ACTION
// ===============================
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

    document.getElementById("subtitle").textContent =
        deviceId.startsWith("lugnsten")
            ? "En liten trygghet i fickan"
            : "Ord för stunden";

    const luckBtn = document.getElementById("luckButton");
    const lullBtn = document.getElementById("lullButton");

    if (deviceId.startsWith("lugnsten")) {
        luckBtn.style.display = "none";
        lullBtn.style.display = "block";
        updateQuote(getLullQuote());
    } else {
        luckBtn.style.display = "block";
        lullBtn.style.display = "none";
        updateQuote(getDailyQuote());
    }
});
