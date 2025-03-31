function toggleSubmenu(button) {
    button.nextElementSibling.classList.toggle("show");
    button.classList.toggle("rotate");
}

function onLogOut() {
    document.getElementById("popupLogout").style.display = "block";
    
    document.getElementById('close').addEventListener("click", () =>{
        document.getElementById("popupLogout").style.display = "none";
    })

    document.getElementById('closebtn').addEventListener("click", () =>{
        document.getElementById("popupLogout").style.display = "none";
    })

    document.getElementById('okbtn').addEventListener("click", () =>{
        // Clear the login status from localStorage
        localStorage.removeItem('isLoggedIn');

        // Redirect to login page
        window.location.href = "login.html";
    })
}


document.getElementById("rangeNumber").addEventListener("input", () => {
    document.getElementById("boxGenerate").textContent = [];
    for (let i = 0; i < document.getElementById("rangeNumber").value; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        box.innerText = `${i}`;
        document.getElementById("boxGenerate").appendChild(box);
    }
})
