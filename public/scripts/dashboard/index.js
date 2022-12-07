
const callInit = (page) => {
    if (page === "links") {
        updateLinks();
    }
}

const changePage = async (url) => {
    let destination =  url === "" ? "/app" : `/app/${url}`;
    const res = await fetch(destination);
    const text = await res.text();

    let dom = new DOMParser().parseFromString(text, "text/html");

    document.title = dom.title;
    document.body = dom.body;

    window.history.pushState({}, '', destination);
    callInit(url);
}

window.addEventListener("load", async () => {
    window.location.hash = "";
    let res = await fetch("/app/_info", {
        method: 'GET',
        credentials: 'include'
    });

    let json = await res.json();
    window.user_info = json;

    let url = window.location.pathname;
    let page = url.substring(url.lastIndexOf('/') + 1)

    callInit(page)
}) 
