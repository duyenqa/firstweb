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
