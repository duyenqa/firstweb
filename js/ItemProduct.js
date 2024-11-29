const productList = document.getElementById('product-list');
const productSearch = document.getElementById('productSearch');
const quantity = document.getElementById("qtyCart");
let carts = JSON.parse(localStorage.getItem('cart')) || [];

productList.innerHTML = '<button class="buttonload"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;Loading Products...</button>';

axios.get('https://fakestoreapi.com/products')
    .then(response => {
        const products = response.data;

        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
            return;
        }

        let cartCount = 0;
        const displayCartNumber = () => {
            cartCount = carts.reduce((total, item) => total + item.quantity, 0);
            quantity.innerHTML = cartCount;
        };

        const displayProducts = (filteredProducts) => {
            const productsHtml = filteredProducts.map(product => {
                return `
                        <div class="box">
                            <div class="wrap-img">
                                <img class="pic" src="${product.image}" alt="${product.title}">
                            </div>
                            <div class="product-details">
                                <h4 class="name-product">${product.title}</h4>
                                <p class="type" style="display: none;">${product.category}</p>
                                <p class="info" style="display: none;">${product.description}</p>
                                <p class="price">$${product.price}</p>
                            </div>
                            <div class="buttons">
                                <button class="buy-button">Detail</button>
                                <button class="cart-button">Buy</button>
                            </div>
                        </div>
                    `;
            }).join('');

            productList.innerHTML = productsHtml;

            const cartButtons = document.querySelectorAll('.cart-button');
            cartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productItem = button.closest('.box');
                    const productTitle = productItem.querySelector('.name-product').textContent;
                    const productPrice = productItem.querySelector('.price').textContent.replace('$', '');
                    const productImage = productItem.querySelector('img').src;

                    // Find product by title to avoid duplicates
                    const existingProductIndex = carts.findIndex(item => item.title === productTitle);

                    if (existingProductIndex === -1) {
                        // If the product is not already in the cart, add it
                        carts.push({
                            title: productTitle,
                            price: productPrice,
                            image: productImage,
                            quantity: 1
                        });
                    } else {
                        // If product exists in cart, increment the quantity
                        carts[existingProductIndex].quantity++;
                    }
                    //Save cart in localStorage
                    localStorage.setItem('cart', JSON.stringify(carts));
                
                    displayCartNumber();
                });
            });

            const buyButtons = document.querySelectorAll('.buy-button');
            const productItem = document.getElementById('mySidenav');
            buyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const screenWidth = window.innerWidth;

                    if (screenWidth <= 600) {
                        productItem.style.width = "100%";  // For mobile devices
                    } else if (screenWidth <= 1024) {
                        productItem.style.width = "100%";  // For tablets
                    } else {
                        productItem.style.width = "280px";  // For desktops
                    }

                    // productItem.style.width = "280px";
                    const productTitle = button.closest('.box').querySelector('.name-product').textContent;
                    const productDescription = button.closest('.box').querySelector('.info').textContent;
                    const productCategory = button.closest('.box').querySelector('.type').textContent;

                    document.getElementById("nameProduct").innerHTML = `${productTitle}`;
                    document.getElementById("detailProduct").innerHTML = `${productDescription}`;
                    document.getElementById("typeCategory").innerHTML = `${productCategory}`;
                });
            });
        };

        displayProducts(products);

        productSearch.addEventListener('input', () => {
            const searchQuery = productSearch.value.toLowerCase();

            if (!searchQuery) {
                displayProducts(products);
                return;
            }

            const filteredProducts = products.filter(item =>
                item.title.toLowerCase().includes(searchQuery)
            );

            if (filteredProducts.length === 0) {
                productList.innerHTML = '<p>No matching products found.</p>';
                return;
            }
            displayProducts(filteredProducts);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load products at the moment. Please try again later.</p>';
    });

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function onCart() {
    window.location.href = "pages/cart.html"; // Redirect to cart
}