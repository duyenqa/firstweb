let carts = JSON.parse(localStorage.getItem('cart')) || [];

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

function onCheckout() {
    window.location.href = "checkout.html"; // Redirect to checkout
}