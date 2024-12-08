const openModalImage = document.getElementById("imagesModal");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("img-preview").onclick = function () {
        openModalImage.style.display = "block";
        document.getElementById("img01").src = this.src;
        document.getElementById("caption").innerHTML = this.alt;
    }

    document.getElementById("close").onclick = function () {        
        openModalImage.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById("imagesModal")) {
            openModalImage.style.display = "none";
        }
    };
});