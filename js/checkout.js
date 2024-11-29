let carts = JSON.parse(localStorage.getItem('cart')) || [];
let isExistName = localStorage.getItem("username") || "";
let nameElement = document.getElementById("name");

nameElement.innerHTML = `${isExistName}`;

function onSubmitCart() {
    // Clear the cart in localStorage
    localStorage.removeItem('cart');
    carts = [];
    // Clear username in localStorage
    localStorage.removeItem('username');
    
    //Go back home page
    window.location.href = "../index.html"; 

}