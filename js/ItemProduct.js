// Start by showing a loading spinner or message before the request completes
const productList = document.getElementById('product-list');
productList.innerHTML = '<p class="loading">Loading products...</p>';

axios.get('https://fakestoreapi.com/products')
    .then(response => {
        const products = response.data.slice(0, 8);
        
        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
            return;
        }

        const productsHtml = products.map(product => {
            if (product) {
                return `
                    <div class="box">
                        <div class="wrap-img">
                            <img class="pic" src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product-details">
                            <h4 class="name-product">${product.title}</h4>
                            <p class="price">$${product.price}</p>
                        </div>
                        <div class="buttons">
                            <button class="buy-button">Mua ngay</button>
                            <button class="cart-button">Giỏ hàng</button>
                        </div>
                    </div>
                `;
            } else {
                return '<p>Product is unavailable.</p>';
            }
        }).join('');

        productList.innerHTML = productsHtml;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load products at the moment. Please try again later.</p>';
    });
