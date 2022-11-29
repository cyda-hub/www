
const THEME_SELECTOR = "theme-is-dark-mode"
const THEME_BG = document.getElementById("theme-changer");

const ROOT = document.querySelector(':root');

const setTheme = (isDark) => {
    if (isDark) {
        ROOT.style.setProperty("--primary-color", "#262835");
        ROOT.style.setProperty("--secondary-color", "#2a2d39");
        ROOT.style.setProperty("--third-color", "#383a4a");

        ROOT.style.setProperty("--border-primary", "rgb(77, 77, 77)");

        ROOT.style.setProperty("--gradient-start", "#f6dec9");
        ROOT.style.setProperty("--gradient-end", "#dec8f5");

        ROOT.style.setProperty("--primary-cl", "#fff");
        ROOT.style.setProperty("--inverted-cl", "#000");
    } else {
        console.log("not dark!")
        ROOT.style.setProperty("--primary-color", "#FFF");
        ROOT.style.setProperty("--secondary-color", "#F7F8FB");
        ROOT.style.setProperty("--third-color", "rgb(229, 231, 235)");
    
        ROOT.style.setProperty("--border-primary", "rgb(229, 231, 235)");

        ROOT.style.setProperty("--gradient-start", "#f6dec9");
        ROOT.style.setProperty("--gradient-end", "#dec8f5");

        ROOT.style.setProperty("--primary-cl", "#000");
        ROOT.style.setProperty("--inverted-cl", "#000");
    }
}

const onload = () => {
    if (typeof localStorage.getItem(THEME_SELECTOR) === "null") {
        localStorage.setItem(THEME_SELECTOR, "1");
        setTheme(true);
    } else {
        let isDark = localStorage.getItem(THEME_SELECTOR) === "1";
        setTheme(isDark)
    }
}

onload();

THEME_BG.addEventListener("click", () => {
    let isDark = localStorage.getItem(THEME_SELECTOR) === "1";
    let theme = !isDark;

    setTheme(theme);
    localStorage.setItem(THEME_SELECTOR, theme ? "1" : "0")
})