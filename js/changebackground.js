const colors = document.querySelectorAll(".color-s");
colors.forEach(color => {
    color.addEventListener("click", () => {
        const codeColor = color.getAttribute("data-color");
        document.querySelector(".container").style.backgroundColor = codeColor;
    });
});