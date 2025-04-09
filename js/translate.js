import data from '../lang.json' with {type: "json"};

const langList = document.getElementById("sentences");
let langEng = "";
let langVi = "";
langList.innerHTML = "";


try {
    data.translations.forEach((lang) => {
        const item = document.createElement("p");
        item.innerHTML = `${lang.source_text}`;
        langList.appendChild(item);
    });

    document.getElementById("translateEng").addEventListener("click", function translate() {
        langVi = document.getElementById("translateEng").textContent;
        translateLanguage(langVi);
    })

    document.getElementById("translateVN").addEventListener("click", function translate() {
        langEng = document.getElementById("translateVN").textContent;
        translateLanguage(langEng);
    })

    function translateLanguage(keyLanguage) {
        if (keyLanguage == "en") {
            langList.innerHTML = "";
            return data.translations.forEach((lang) => {
                const item = document.createElement("p");
                item.innerHTML = `${lang.source_text}`;
                langList.appendChild(item);
            })
        }else if (keyLanguage = "vi") {
            langList.innerHTML = "";
            return data.translations.forEach((lang) => {
                const item = document.createElement("p");
                item.innerHTML = `${lang.target_text}`;
                langList.appendChild(item);
            })
        }else{
            alert("Language invalid!!!");
        }
    }
} catch (error) {
    console.log(`Error reading file Json: ${err}`);
}



