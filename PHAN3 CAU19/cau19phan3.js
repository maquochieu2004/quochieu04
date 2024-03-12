const letters = "BOOK";
const listElement = document.getElementById("list");

function permute(str, prefix = "") {
    if (str.length === 0) {
        listElement.innerHTML += `<li>${prefix}</li>`;
        return;
    }

    for (let i = 0; i < str.length; i++) {
        const newPrefix = prefix + str[i];
        const newStr = str.slice(0, i) + str.slice(i + 1);
        permute(newStr, newPrefix);
    }
}

permute(letters);
