// ===============================
// 🔗 ID (NFC / kaka / sten)
// ===============================
const params = new URLSearchParams(window.location.search);
const deviceId = params.get("id") || "lyckokaka01";

const isLugnsten = deviceId.startsWith("lugnsten");


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
    "Små steg kan leda långt.",
    "Du behöver inte förstå allt idag.",
    "Små glädjeämnen räknas också.",
    "Framtiden är inte färdigskriven.",
    "Du är redan på väg.",
    "Det är okej att inte veta än.",
    "Allt börjar med något litet.",
    "Du behöver inte se hela vägen för att ta nästa steg.",
    "Ljuset kommer tillbaka, även efter långa vintrar.",
    "Det du gör nu spelar roll, även om det känns litet."
];


// ===============================
// 🪨 LUGNSTEN
// ===============================
const calmCallQuotes = [
    "Du får börja mjukt idag.",
    "Du behöver inte ha bråttom in i den här stunden.",
    "Det räcker att du är här."
];

const calmSocialQuotes = [
    "Du behöver inte prestera här.",
    "Det är okej att vara lite obekväm.",
    "Du får bara vara."
];

const calmResetQuotes = [
    "Dagen är redan tillräcklig.",
    "Du kan släppa taget om resten.",
    "Du behöver inte ta med allt vidare.",
    "Du är klar för idag."
];


// ===============================
// 🔧 HELPERS
// ===============================
function random(list) {
    return list[Math.floor(Math.random() * list.length)];
}


// ===============================
// 🪨 LUGNSTEN LOGIK
// ===============================
function getLullList() {
    const t = getTimeOfDay();

    if (t === "morning") return calmCallQuotes;
    if (t === "evening") return calmResetQuotes;
    return calmSocialQuotes;
}


// ===============================
// 🥠 DAGLIG LYCKOKAKA
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

    const quote = random(wisdomQuotes);
    localStorage.setItem(dailyKey(), quote);

    return quote;
}


// ===============================
// 🪨 LUGNSTEN – NYTT VARJE SKANNING
// ===============================
function getLullQuote() {
    const list = getLullList();
    return random(list);
}


// ===============================
// ✨ UI
// ===============================
function updateQuote(text) {
    const el = document.getElementById("quote");

    el.classList.remove("show");

    setTimeout(() => {
        el.textContent = text;
        el.classList.add("show");
    }, 200);
}


// ===============================
// 🔁 ACTION
// ===============================
function newQuote() {
    if (isLugnsten) {
        updateQuote(getLullQuote());
    } else {
        updateQuote(getDailyQuote());
    }
}


// ===============================
// 🚀 START
// ===============================
window.addEventListener("DOMContentLoaded", () => {

    const subtitle = document.getElementById("subtitle");
    const luckBtn = document.getElementById("luckButton");
    const lullBtn = document.getElementById("lullButton");

    if (isLugnsten) {
        document.body.classList.add("lugnsten");

        subtitle.textContent = "En liten trygghet i fickan";

        if (luckBtn) luckBtn.style.display = "none";
        if (lullBtn) lullBtn.style.display = "flex";

        updateQuote(getLullQuote());

    } else {

        subtitle.textContent = "Ord för stunden";

        if (luckBtn) luckBtn.style.display = "block";
        if (lullBtn) lullBtn.style.display = "none";

        updateQuote(getDailyQuote());
    }
});
