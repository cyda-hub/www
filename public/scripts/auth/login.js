
const PASSWORD_INPUT = document.getElementById("pwd-input");
const EMAIL_INPUT = document.getElementById("email-input");

const ERROR = document.getElementById("error");
const FORM = document.getElementsByTagName("form")[0];

FORM.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = EMAIL_INPUT.value;
    let password = PASSWORD_INPUT.value;

    let status = 200;
    let response = await fetch("/auth/login", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            email, password
        }),
    }).then((response) => {status = response.status; return response.json()});

    // TODO: highlight input with relative error
    if (status !== 200) {
        ERROR.innerHTML = `<p>${response.errors.map(x => x.msg).join(', ')}</p>`;
    } else {
        Cookies.set("token", response.token, {
            sameSite: "Lax",
            secure: true,
            // httpOnly: true
        });

        window.location.href = "/app";
    }

    return false;
});
