let carts = JSON.parse(localStorage.getItem('cart')) || [];

function onSubmitCart() {
    // Clear the cart in localStorage
    localStorage.removeItem('cart');
    carts = [];
    
    //Go back home page
    window.location.href = "../index.html"; 

}