let carts = JSON.parse(localStorage.getItem('cart')) || [];
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const address = document.getElementById("address");
const district = document.getElementById("district");
const provice = document.getElementById("province");
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
    window.location.href = "../index.html"; // Redirect to home page
});

displayCart();

// Full Name Validation
function validateFullName(fullname) {
    return fullname.trim().split(" ").length >= 2; // Check if there are at least two words (first and last name)
}

// Email Validation
function validateEmail(email) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email); // Check if email matches pattern
}

// Phone Number Validation
function validatePhone(phone) {
    const phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phonePattern.test(phone); // Check if phone number matches the pattern
}

function validateDistrict(district) {
    return district.trim().length > 0; // Check if district is not empty
}

// Address Validation
function validateAddress(address) {
    return address.trim().length > 0; // Check if address is not empty
}

function setFullName(textName){    
    const isFullNameValid = validateFullName(textName);
        
    if (!isFullNameValid) {
        document.getElementById("notifyName").innerHTML = "The username must be more than one word.";
    }else{
        document.getElementById("notifyName").innerHTML = "";
    }
}

function setEmail(textEmail){    
    const isEmailValid = validateEmail(textEmail);
        
    if (!isEmailValid) {
        document.getElementById("notifyEmail").innerHTML = "The email address is invalid";
    }else{
        document.getElementById("notifyEmail").innerHTML = "";
    }
}

function setPhone(textPhone){    
    const isPhoneValid = validatePhone(textPhone);
        
    if (!isPhoneValid) {
        document.getElementById("notifyPhone").innerHTML = "Phone number is invalid";
    }else{
        document.getElementById("notifyPhone").innerHTML = "";
    }
}

function setAddress(textAddress) {
    const isAddressValid = validateAddress(textAddress);

    if (!isAddressValid) {
        document.getElementById("notifyAddress").innerHTML = "The address is invalid";
    }else{
        document.getElementById("notifyAddress").innerHTML = "";
    }
}

function setProvince(textProvince) {
    if (textProvince === "none") {
        document.getElementById("notifyProvince").innerHTML = "The province is required";
    } else {
        document.getElementById("notifyProvince").innerHTML = "";
    }
}

function setDistrict(textDistrict){
    const isDistrictValid = validateDistrict(textDistrict);

    if (!isDistrictValid) {
        document.getElementById("notifyDistrict").innerHTML = "The district is required";
    }else{
        document.getElementById("notifyDistrict").innerHTML = "";
    }
}

function onCheckout() {
    const user = {
        name: fullname.value,
        email: email.value,
        address: address.value,
        district: district.value,
        province: provice.value,
        phone: phone.value
    };

    const isFullNameValid = validateFullName(user.name);
    const isEmailValid = validateEmail(user.email);
    const isPhoneValid = validatePhone(user.phone);
    const isAddressValid = validateAddress(user.address);
    let isDistrict = user.district;
    let isExistProvince = user.province;
    
    if (carts.length != 0) {
        if (isFullNameValid && isEmailValid && isPhoneValid && isAddressValid && isDistrict != "" && isExistProvince != "none") {
            localStorage.setItem("username", JSON.stringify(user));
            window.location.href = "checkout.html"; // Redirect to checkout
        }else {
            if(!isFullNameValid && !isEmailValid && !isPhoneValid && !isAddressValid && !isDistrict && isExistProvince === "none"){
                alert("All fields are required!");
            }
        }
    }
}