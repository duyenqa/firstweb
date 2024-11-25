const productList = document.getElementById('product-list');
productList.innerHTML = '<button class="buttonload"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;Loading Product...</button>';

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

        const buyButtons = document.querySelectorAll('.buy-button');
        const productItem = document.getElementById('mySidenav');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                productItem.style.width = "300px";
                const productTitle = button.closest('.box').querySelector('.name-product').textContent;
                document.getElementById("nameProduct").innerHTML = `${productTitle}`
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        productList.innerHTML = '<p>Unable to load products at the moment. Please try again later.</p>';
    });

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}