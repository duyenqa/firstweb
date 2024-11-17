axios.get('https://fakestoreapi.com/products')
    .then(response => {
        const productList = document.getElementById('product-list');

        const productsHtml = response.data.slice(0, 8).map(product => {
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
        }).join('');
        productList.innerHTML = productsHtml;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });