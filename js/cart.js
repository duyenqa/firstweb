function init() {
    const products = [
        { id: "iphone-5", name: "Iphone 5", price: 30000000,qty:1 },
        { id: "iphone-x", name: "Iphone X", price: 12000000,qty:1 },
        { id: "google-pixel", name: "Google Pixel", price: 11000000,qty:1 }
    ];
    //đổ vào input
    let ProductsModels = document.getElementById("ProductsModels");
    ProductsModels.value = JSON.stringify(products);
    //duyệt mảng
    let str = "";
    for (let i = 0; i < products.length; i++) {
        str += `<li id="${products[i].id}">
            <button onclick="addToCart('${products[i].id}')">Add Cart</button>&nbsp;
            <span>${products[i].name} - ${products[i].price}</span>
        </li>`
    }
    //xuất ra cho người dùng xem
    let ProductsView = document.getElementById("ProductsView");
    ProductsView.innerHTML = str;
    updateCart([]);
}

function addToCart(id) {
    let ProductsModels = document.getElementById("ProductsModels");
    let products = JSON.parse(ProductsModels.value);
    let CartModels = document.getElementById("CartModels");
    let cart = JSON.parse(CartModels.value);
    let totalCart = document.getElementById("CartSize");
    let isExistCart = false;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa ?
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].product.id === id) {
            cart[i].qty += 1;
            isExistCart = true;
            break;
        }
    }

    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm vào giỏ
    if (!isExistCart) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                cart.push({ product: products[i], qty: 1 });
                break;
            }
        }
    }

    // Cập nhật tổng số lượng sản phẩm trong giỏ hàng
    totalCart.innerHTML = cart.length;
    updateCart(cart);
}

function updateCart(cart) {
    //đổ vào input
    let CartModels = document.getElementById("CartModels");
    CartModels.value = JSON.stringify(cart);
    let str = "";
    for (let i = 0; i < cart.length; i++) {
            str += `<li id="${cart[i].product.id}">
            <button onclick="removeFromCart('${cart[i].product.id}')">delete</button> &nbsp;
            <span>${cart[i].product.name} - price: ${(cart[i].product.price * cart[i].qty)} - quantity: ${cart[i].qty}</span>
        </li>`;
        
    }
    //xuất ra cho người dùng xem
    let CartView = document.getElementById("CartView");
    CartView.innerHTML = str;
}
function removeFromCart(id) {
    let CartModels = document.getElementById("CartModels");
    cart = JSON.parse(CartModels.value)
    for(let i = 0; i < cart.length;i++){
        if(id == cart[i].product.id){
            cart.splice(i,1);
            break;
        }
    }
    updateCart(cart);
}