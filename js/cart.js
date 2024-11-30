let carts = JSON.parse(localStorage.getItem('cart')) || [];
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const address = document.getElementById("address");
const phone = document.getElementById("phone");

if (carts.length == 0) {
    document.getElementById('checkoutButton').style.cursor = "not-allowed";
    document.getElementById('checkoutButton').style.opacity = 0.6;
    document.getElementById('checkoutButton').disabled = true;
}

const displayCart = () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalItems = document.getElementById('totalItems');
    const totalPrice = document.getElementById('totalPrice');

    // Clear previous cart content
    cartItemsContainer.innerHTML = '';

    // If the cart is empty
    if (carts.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalItems.textContent = 0;
        totalPrice.textContent = '0.00';
        return;
    }

    // Calculate the total items and price
    let totalQuantity = 0;
    let totalCost = 0;

    carts.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.title}" style="width: 50px;">
            </td>
            <td>
                <span>${item.title}</span>
            </td>
            <td>
                <span>$${item.price}</span>
            </td>
            <td>
                <span>${item.quantity}</span>
            </td>
            <td>
                <button class="removeButton btn warning" data-title="${item.title}">Delete</button>
            </td>
        `;
        cartItemsContainer.appendChild(tr);

        // Update the totals
        totalQuantity += item.quantity;
        totalCost += item.price * item.quantity;
    });

    // Update the UI with total items and total price
    totalItems.textContent = totalQuantity;
    totalPrice.textContent = totalCost.toFixed(2);
};

// Function to remove an item from the cart
const removeFromCart = (title) => {
    // Remove item from the cart array
    carts = carts.filter(item => item.title !== title);

    // Update localStorage with the new cart
    localStorage.setItem('cart', JSON.stringify(carts));

    // Re-render the cart display
    displayCart();
};

// Add event listener to the remove buttons
document.getElementById('cartItems').addEventListener('click', (event) => {
    if (event.target.classList.contains('removeButton')) {
        const itemTitle = event.target.getAttribute('data-title');
        removeFromCart(itemTitle);
    }
});

// Clear the cart in localStorage
document.getElementById('clearCartButton').addEventListener('click', () => {
    localStorage.removeItem('cart');
    carts = [];
    displayCart();
});

displayCart();

// Full Name Validation
function validateFullName(fullname) {
    return fullname.trim().split(" ").length >= 2; // Check if there are at least two words (first and last name)
}

// Email Validation
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // Check if email matches pattern
}

// Phone Number Validation
function validatePhone(phone) {
    const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number format (e.g., USA)
    return phonePattern.test(phone); // Check if phone number matches the pattern
}

// Address Validation
function validateAddress(address) {
    return address.trim().length > 0; // Check if address is not empty
}

function onCheckout() {
    const user = {
        name: fullname.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    };
    
    const isFullNameValid = validateFullName(user.name);
    const isEmailValid = validateEmail(user.email);
    const isPhoneValid = validatePhone(user.phone);
    const isAddressValid = validateAddress(user.address);
    
    if (carts.length != 0) {
        if (isFullNameValid && isEmailValid && isPhoneValid && isAddressValid) {
            localStorage.setItem("username", JSON.stringify(user));
            window.location.href = "checkout.html"; // Redirect to checkout
        }else {
            if(!isFullNameValid && !isEmailValid && !isPhoneValid && !isAddressValid){
                alert("All fields are required!");
            }

            if (!isFullNameValid) {
                document.getElementById("notifyName").innerHTML = `The username must be more than two words.`;
            }else if(!isEmailValid){
                document.getElementById("notifyEmail").innerHTML = `The email is invalid.`;
            }else if(!isPhoneValid){
                document.getElementById("notifyPhone").innerHTML = `Phone number must be 10 digits.`;
            }else if(!isAddressValid){
                document.getElementById("notifyAddress").innerHTML = `The address is invalid`;
            }
        }
    }
}