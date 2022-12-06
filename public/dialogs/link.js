const form = document.getElementById("link-gen-form");

const destination = document.getElementById("link-gen-form-input");
const code = document.getElementById("link-gen-form-code");
const pwd = document.getElementById("link-gen-form-pwd");
const date = document.getElementById("link-gen-form-date");

const errorDiv = document.getElementById("link-gen-error");
const linkPopup = document.getElementById("link-gen-popup-link");

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
    console.log(`${window.location.origin}/link`)
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
    }
};



const createLinkSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
};
