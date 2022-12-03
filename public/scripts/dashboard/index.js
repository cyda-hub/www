
const changePage = async (url) => {
    let destination =  url === "" ? "/app" : `/app/${url}`;
    const res = await fetch(destination);
    const text = await res.text();
    console.log(text)
    let dom = new DOMParser().parseFromString(text, "text/html");

    document.title = dom.title;
    document.body = dom.body;

    window.history.pushState({}, '', destination);
}
