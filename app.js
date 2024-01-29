const textarea = document.querySelector("#text");
const encryptedTextarea = document.querySelector("#encrypted-textarea");
const cardContent = document.querySelector(".card__content");
const btnCopy = document.querySelector(".copy");

function showTextEncrypted(textareaValue) {
    encryptedTextarea.classList.toggle("hidden", textareaValue === "");
    cardContent.style.display = textareaValue === "" ? "flex" : "none";
    encryptedTextarea.value = textareaValue;
}

function encryptText(textareaValue) {
    const replacements = { 'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat' };
    const newText = [...textareaValue].map(char => replacements[char] || char).join('');
    showTextEncrypted(newText);
}

function decryptText(textareaValue) {
    const replacements = { 'ai': 'a', 'enter': 'e', 'imes': 'i', 'ober': 'o', 'ufat': 'u' };
    const newText = [...textareaValue.matchAll(/(ai|enter|imes|ober|ufat)|./g)].map(match => replacements[match[0]] || match[0]).join('');
    showTextEncrypted(newText);
}

function copyText(value) {
    if (value !== "") {
        encryptedTextarea.select();
        encryptedTextarea.setSelectionRange(0, 999);
        navigator.clipboard.writeText(value);
        btnCopy.innerHTML = "¡Texto copiado!";
        setTimeout(() => {
            btnCopy.innerHTML = "Copiar";
        }, 1000);
    }
}

textarea.addEventListener("input", function() {
    // Convierte automáticamente el texto ingresado a minúsculas
    this.value = this.value.toLowerCase();
});

btnCopy.addEventListener("click", function() {
    copyText(encryptedTextarea.value);
});

// Se agregan Event Listeners a los botones para llamar a las funciones que necesitemos
document.querySelectorAll(".encrypt, .decrypt").forEach(btn => {
    btn.addEventListener("click", () => {
        const isEncrypt = btn.classList.contains("encrypt");
        const textValue = textarea.value;
        if (isEncrypt) {
            encryptText(textValue);
        } else {
            decryptText(textValue);
        }
    });
});
