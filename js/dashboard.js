function onLogOut() {
    // Clear the login status from localStorage
    localStorage.removeItem('isLoggedIn');

    // Redirect to login page
    window.location.href = "login.html";
}
