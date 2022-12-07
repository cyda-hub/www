const editLink = (id) => {
    const link = window.user_info.links.find(element => element.id === id);

    window.EasyPopup.get("link-gen-popup").open();

    destination.value = link.dest;
    code.value = link.id;
    pwd.value = link.pwd;
    date.value = link.expire;

    // TODO: change button's text
}

const createElementForLink = (link) => {
    return `
<div class="user-link">
    <div style="display: flex; align-items: center; position: relative; width: 100%;">
        <div>
            <input class="dropdown" type="checkbox" id="dropdown-link-${link.id}" name="dropdown"/>
            <label class="link-dropdown for-dropdown" for="dropdown-link-${link.id}">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
            </label>
            <div class="section-dropdown">
                <a onclick="createQRCodePage('${link.dest}')" href="#">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                    <span>Generate QR code</span>
                </a>
            </div>
        </div>
        <div style="width: 100%">
            <div class="link-id">
                ${link.id}
            </div>
            <div class="link-dest">
                ${link.dest}
            </div>
        </div>
        <div>
            <div onclick="editLink('${link.id}')" class="edit-link">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </div>
        </div>
    </div>
</div>
`
}

const updateLinks = () => {
    const LINKS_CONTAINER = document.querySelector("#links-container > .links-list");
    console.log(LINKS_CONTAINER)

    // remove all links from container
    while (LINKS_CONTAINER.firstChild) {
        LINKS_CONTAINER.removeChild(LINKS_CONTAINER.firstChild);
    }

    console.log(window.user_info)
    for (const link of window.user_info.links) {
        LINKS_CONTAINER.innerHTML += createElementForLink(link);
    }
}
