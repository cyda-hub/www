
const changePage = async (url) => {
    let destination =  url === "" ? "/app" : `/app/${url}`;
    const res = await fetch(destination);
    const text = await res.text();

    let dom = new DOMParser().parseFromString(text, "text/html");

    document.title = dom.title;
    document.body = dom.body;

    window.history.pushState({}, '', destination);
}

window.addEventListener("load", async () => {
    let res = await fetch("/app/_info", {
        method: 'GET',
        credentials: 'include'
    });

    let json = await res.json();
    console.log(json)
}) 
