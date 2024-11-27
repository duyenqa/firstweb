const productList = document.getElementById('product-list');
const productSearch = document.getElementById('productSearch');
const quantity = document.getElementById("qtyCart");


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
                                <button class="cart-button">Add Cart</button>
                            </div>
                        </div>
                    `;
            }).join('');

            productList.innerHTML = productsHtml;

            const cartButtons = document.querySelectorAll('.cart-button');
            cartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    cartCount++; 
                    displayCartNumber(); 
                });
            });

            const buyButtons = document.querySelectorAll('.buy-button');
            const productItem = document.getElementById('mySidenav');
            buyButtons.forEach(button => {
                button.addEventListener('click', () => {
                    productItem.style.width = "280px";
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

        // const displayCartNumber = (initialNumber) => {
        //     const cartButtons = document.getElementById("cart-button");
        //     quantity.innerHTML = `${initialNumber}`; 

        //     cartButtons.addEventListener('click', () => {
        //         initialNumber++; 
        //         quantity.innerHTML = `${initialNumber}`; 
        //     });
        // };
        // displayCartNumber(0);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load products at the moment. Please try again later.</p>';
    });

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}