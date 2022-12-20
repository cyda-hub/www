
const reloadPoups = () => {
    window.InitEasyPopup({});

    initLinkDialog();
    initQRDialog();
}

const callInit = (page, isNew) => {
    if (page === "links") {

        updateLinks();

        if (isNew) {
            reloadPoups();
        }
    }

    window.jsConfetti = new JSConfetti();
    AOS.init();
}

const changePage = async (url) => {
    let destination =  url === "" ? "/app" : `/app/${url}`;
    const res = await fetch(destination);
    const text = await res.text();

    let dom = new DOMParser().parseFromString(text, "text/html");

    document.title = dom.title;
    document.body = dom.body;

    window.history.pushState({}, '', destination);
    callInit(url, true);
}

async function recieveUserInfo(cb) {

    let res = await fetch("/app/_info", {
        method: 'GET',
        credentials: 'include'
    });

    let json = await res.json();
    window.user_info = json;

    if (typeof cb !== "undefined") {
        console.log("callback!")
        cb()
    }
}

window.addEventListener("load", async () => {
    window.location.hash = "";
    await recieveUserInfo();

    let url = window.location.pathname;
    let page = url.substring(url.lastIndexOf('/') + 1)

    callInit(page, false)
}) 
