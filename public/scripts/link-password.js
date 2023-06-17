
const PASSWORD_INPUT = document.getElementById("pwd-input");
const ERROR = document.getElementById("error");

const FORM = document.getElementsByTagName("form")[0];

FORM.addEventListener("submit", async (e) => {
    e.preventDefault();

    let val = PASSWORD_INPUT.value;
    let response = await fetch("/link-pwd-check", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id: window.urlID, pwd: val }),
    }).then((response) => response.json());

    if (response.type == "failure") {
        ERROR.innerHTML = `<p>${response.message}</p>`;
        PASSWORD_INPUT.classList.add("error");
    } else if (response.type == "success") {
        window.location.replace(response.message)
    }

    return false;
});
