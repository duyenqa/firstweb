document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("img-preview").onclick = function () {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("img01").src = this.src;
        document.getElementById("caption").innerHTML = this.alt;
    }

    document.getElementById("close").onclick = function () {        
        document.getElementById("myModal").style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        }
    };
});