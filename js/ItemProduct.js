const productList = document.getElementById('product-list');
productList.innerHTML = '<button class="buttonload"><i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;Loading Product...</button>';

axios.get('https://fakestoreapi.com/products')
    .then(response => {
        const products = response.data;

        if (products.length === 0) {
            productList.innerHTML = '<p>No products available.</p>';
            return;
        }

        const shuffledProducts = products .map(product => ({ product, sort: Math.random() })) .sort((a, b) => a.sort - b.sort) .map(({ product }) => product);

        const productsHtml = shuffledProducts.map(product => {
            if (product) {
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
            } else {
                return '<p>Product is unavailable.</p>';
            }
        }).join('');

        productList.innerHTML = productsHtml;

        const buyButtons = document.querySelectorAll('.buy-button');
        const productItem = document.getElementById('mySidenav');
        buyButtons.forEach(button => {
            button.addEventListener('click', () => {
                productItem.style.width = "280px";
                const productTitle = button.closest('.box').querySelector('.name-product').textContent;
                const productDescription = button.closest('.box').querySelector('.info').textContent;
                const productCategory = button.closest('.box').querySelector('.type').textContent;

                document.getElementById("nameProduct").innerHTML = `${productTitle}`
                document.getElementById("detailProduct").innerHTML = `${productDescription}`
                document.getElementById("typeCategory").innerHTML = `${productCategory}`
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