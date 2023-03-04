const editLink = (id) => {
    const link = window.user_info.links.find(element => element.id === id);

    window.EasyPopup.get("link-gen-popup").open();

    destination.value = link.dest;
    code.value = link.id;
    code.disabled = true;
    pwd.value = link.pwd ?? "";
    date.value = link.expire ?? "";

    linkGenBtnText.innerHTML = "Edit Link";
    linkTitleText.innerHTML = "Edit Link";

    linkEditMode = true;
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
                <a onclick="createQRCodePage('${window.location.origin}/${link.id}', true)" href="#">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                    <span>Generate QR code</span>
                </a>
                <a href="/app/link/${link.id}">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    <span>View analytics</span>
                </a>
                <a onclick="shareLink('${link.id}')" href="#">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    <span>Share link</span>
                </a>
                <hr />
                <!-- TODO -->
                <a href="#" onclick="event.stopPropagation();" style="color: rgb(220 38 38);">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    <span>Delete link</span>
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
            <div onclick="event.stopPropagation();editLink('${link.id}')" class="edit-link">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </div>
        </div>
    </div>
</div>
`
}

function updateLinks() {
    const LINKS_CONTAINER = document.querySelector("#links-container > .links-list");
    const LINKS_COUNTER = document.querySelector("#links-container #link-count");

    // remove all links from container
    while (LINKS_CONTAINER.firstChild) {
        LINKS_CONTAINER.removeChild(LINKS_CONTAINER.firstChild);
    }

    let count = 0;
    for (const link of window.user_info.links) {
        LINKS_CONTAINER.innerHTML += createElementForLink(link);
        count++;
    }

    LINKS_COUNTER.innerHTML = `You currently have <strong>${count}</strong> links activated`;
}
