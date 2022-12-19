
var QR_INPUT = document.getElementById("qr-input-url");
var QR_RESULT = document.getElementById("qr-code-result");

var qr;

const createQRCodePage = (text) => {
    window.EasyPopup.get("qr-code-popup").open();

    QR_INPUT.value = text;
    qr.makeCode(text);
}

const initQRDialog = (load = false) => {

    let id = "qr-code-popup";
    let popup = EasyPopup.get(id);

    QR_INPUT = document.getElementById("qr-input-url");
    QR_RESULT = document.getElementById("qr-code-result");

    QR_INPUT.addEventListener("input", (e) => {
        qr.makeCode(e.target.value)
    })

    popup.options.onClose = (data) => {
        QR_INPUT.value = "";

        qr.makeCode(" ")
    }

    const createQR = () => {
        var pc = getComputedStyle(document.body).getPropertyValue("--primary-color");
        var tc = getComputedStyle(document.body).getPropertyValue("--primary-cl");

        qr = new QRCode("qr-code-result", {
            text: " ",
            width: 128,
            height: 128,
            colorDark : tc,
            colorLight : pc,
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    // I'm as confused as you are
    if (load) {
        setTimeout(createQR, 0)
    } else {
        createQR()
    }
}

window.addEventListener("load", () => {
    initQRDialog(true);
})
