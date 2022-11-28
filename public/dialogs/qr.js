
const QR_INPUT = document.getElementById("qr-input-url");
const QR_RESULT = document.getElementById("qr-code-result");

var qr = undefined;

QR_INPUT.addEventListener("input", (e) => {
    qr.makeCode(e.target.value)
})

window.addEventListener("load", () => {
    setTimeout(() => {
        var pc = getComputedStyle(document.body).getPropertyValue("--primary-color");
        var tc = getComputedStyle(document.body).getPropertyValue("--primary-cl");
    
        var qrcode = new QRCode("qr-code-result", {
            text: " ",
            width: 128,
            height: 128,
            colorDark : tc,
            colorLight : pc,
            correctLevel : QRCode.CorrectLevel.H
        });

        qr = qrcode;
    }, 0)
})
