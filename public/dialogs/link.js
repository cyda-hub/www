// TODO: rename to avoid conflicts
var form = document.getElementById("link-gen-form");

var destination = document.getElementById("link-gen-form-input");
var code = document.getElementById("link-gen-form-code");
var pwd = document.getElementById("link-gen-form-pwd");
var date = document.getElementById("link-gen-form-date");

var errorDiv = document.getElementById("link-gen-error");
var linkPopup = document.getElementById("link-gen-popup-link");

const setLinkToPopup = (link) => {
    linkPopup.innerHTML = `<input type="text" value="${window.location.origin + link}" readonly>`;
}

const clearFields = () => {
    destination.value = "";
    code.value = "";
    pwd.value = "";
    date.value = "";
};

const handleSubmit = async () => {
    const response = await fetch(`${window.location.origin}/link`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ destination: destination.value, code: code.value, pwd: pwd.value, date: date.value }),
    }).then((response) => response.json());

    if (response.type == "failure") {
        errorDiv.innerHTML = `<p>${response.message}, please try another one!</p>`;
    } else if (response.type == "success") {
        window.EasyPopup.get("created-link-popup").open();
        setLinkToPopup(response.message);

        // TODO: clear inputs here
        clearFields();

        if (typeof window.updateLinks === "function") {
            jsConfetti.addConfetti();
            window.recieveUserInfo(window.updateLinks);
        }
    }
};

function shareLink(id) {
    let url = `${window.location.origin}/${id}`;

    document.getElementById("share-link-url-preview").value = url;
    window.EasyPopup.get("share-link-popup").open();
}

function getLinkShareURL() {
    return document.getElementById("share-link-url-preview").value;
}

function copySharedURL(e) {
    let elem = document.getElementById("share-link-url-preview")

    var textArea = document.createElement("textarea");
    textArea.value = elem.value;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {

        var successful = document.execCommand('copy');
        if (successful) {
            e.target.style.borderColor = "green";

            setTimeout(() => {
                e.target.style.borderColor = "var(--border-primary)";
            }, 1000)

            document.body.removeChild(textArea);
            return;
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
    e.target.style.borderColor = "red";

    setTimeout(() => {
        e.target.style.borderColor = "var(--border-primary)";
    }, 1000)
}

const createLinkSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
};

const initLinkDialog = () => {

    form = document.getElementById("link-gen-form");

    destination = document.getElementById("link-gen-form-input");
    code = document.getElementById("link-gen-form-code");
    pwd = document.getElementById("link-gen-form-pwd");
    date = document.getElementById("link-gen-form-date");

    errorDiv = document.getElementById("link-gen-error");
    linkPopup = document.getElementById("link-gen-popup-link");


    let id = "link-gen-popup";
    let popup = EasyPopup.get(id);

    popup.options.onClose = (data) => {
        clearFields();
    }
}

window.addEventListener("load", () => {
    initLinkDialog();
})
