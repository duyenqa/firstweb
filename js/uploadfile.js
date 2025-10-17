let fileInput = document.getElementById("file-input");
let imageContainer = document.getElementById("list-images");
let numOfFiles = document.getElementById("num-of-files");

function preview() {
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${fileInput.files.length} Files Selected`;
    for(i of fileInput.files){
        let reader = new FileReader();
        let aTag = document.createElement("li");
        let figCap = document.createElement("div");
        figCap.classList.add("caption");
        figCap.innerText = i.name;
        aTag.appendChild(figCap);
        reader.onload = () => {
            let img = document.createElement("img");
            img.setAttribute("src", reader.result);
            aTag.setAttribute("target", "_blank");
            aTag.setAttribute("href", reader.result);
            aTag.insertBefore(img, figCap);
        }
        imageContainer.appendChild(aTag);
        reader.readAsDataURL(i);
    }
}

