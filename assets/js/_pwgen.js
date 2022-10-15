const pwGenBtn = document.getElementById("generatePasswordBtn");
const pwCopyBtn = document.getElementById("copyPasswordBtn");
const pwGenDisplay = document.getElementById("passwordDisplay");
const displayCopied = document.getElementById("tooltipSpan");
const charSettings = {
    standard: 16,
    medium: 32,
    strong: 64,
    ultra: 128,
};

const charCheckBox = [
    {
        id: "standard",
        value: 16,
    },
    {
        id: "medium",
        value: 32,
    },
    {
        id: "strong",
        value: 64,
    },
    {
        id: "ultra",
        value: 128,
    },
];

const getCharSettings = () => {
    let charSettings = 16;
    for (let i = 0; i < charCheckBox.length; i++) {
        if (document.getElementById(charCheckBox[i].id).checked) {
            charSettings = charCheckBox[i].value;
        }
    }
    return charSettings;
};

const radioBtns = document.querySelectorAll('input[type="radio"]');
for (let i = 0; i < radioBtns.length; i++) {
    radioBtns[i].addEventListener("change", function () {
        for (let j = 0; j < radioBtns.length; j++) {
            if (radioBtns[j] !== this) {
                radioBtns[j].checked = false;
            }
        }
    });
}

const generatePassword = () => {
    let charSettings = getCharSettings();
    let password = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    for (let i = 0; i < charSettings; i++) {
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return password;
};

pwGenBtn.addEventListener("click", () => {
    pwGenDisplay.textContent = generatePassword();
});

pwCopyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(pwGenDisplay.textContent);
    displayCopied.textContent = "Copied!";
    setTimeout(() => {
        displayCopied.textContent = "";
    }, 1000);
});

pwGenBtn.addEventListener("click", () => {
    let i = 0;
    let txt = generatePassword();
    let speed = 40;
    pwGenDisplay.textContent = "";
    function typeWriter() {
        if (i < txt.length) {
            pwGenDisplay.textContent += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});

