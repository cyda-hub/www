
const THEME_SELECTOR = "theme-is-dark-mode"

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

        let node = document.createElement("meta");

        node.name = "color-scheme";
        node.content = "dark";

        document.head.appendChild(node);
    } else {
        ROOT.style.setProperty("--primary-color", "rgb(249 250 251/1)");
        ROOT.style.setProperty("--secondary-color", "#FFF");
        ROOT.style.setProperty("--third-color", "rgb(229 231 235/1)");
    
        ROOT.style.setProperty("--border-primary", "rgb(229 231 235/1)");

        ROOT.style.setProperty("--gradient-start", "#f6dec9");
        ROOT.style.setProperty("--gradient-end", "#dec8f5");

        ROOT.style.setProperty("--primary-cl", "rgba(0,0,0,.75)");
        ROOT.style.setProperty("--inverted-cl", "#000");
    }

    document.documentElement.classList.remove(isDark ? "light" : "dark");
    document.documentElement.classList.add(isDark ? "dark" : "light");

    localStorage.setItem(THEME_SELECTOR, isDark ? "1" : "0");

    if (typeof window.updateAllAnalytics === "function") {
        window.updateAllAnalytics();
    }
}

const onload = () => {
    if (localStorage.getItem(THEME_SELECTOR) === null) {
        localStorage.setItem(THEME_SELECTOR, "1");
        setTheme(true);
    } else {
        let isDark = localStorage.getItem(THEME_SELECTOR) === "1";
        setTheme(isDark)
    }
}

onload();

function changeThemeOnClick() {
    let isDark = localStorage.getItem(THEME_SELECTOR) === "1";
    let theme = !isDark;

    setTheme(theme);
    localStorage.setItem(THEME_SELECTOR, theme ? "1" : "0")
}
