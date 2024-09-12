function init() {
    const products = [
        { id: "iphone-5", name: "Iphone 5", price: 30000000 },
        { id: "iphone-x", name: "Iphone X", price: 12000000 },
        { id: "google-pixel", name: "Google Pixel", price: 11000000 }
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
    products = JSON.parse(ProductsModels.value);
    let CartModels = document.getElementById("CartModels");
    cart = JSON.parse(CartModels.value);
    let isExistCart = -1;
    //giỏ đã có sản phẩm
    for (let i = 0; i < cart.length; i++) {
        if(id == cart[i].product.id){
            cart[i].product.qty += 1;
            break;
        }
    }
    //giỏ rỗng
    if(isExistCart == -1){
        for (let i = 0; i < products.length; i++) {
            if(id == products[i].id){
                cart.push({product:products[i],qty:1});
                break;
            }
        }
    }
    updateCart(cart);
}
function updateCart(cart) {
    //đổ vào input
    let CartModels = document.getElementById("CartModels");
    CartModels.value = JSON.stringify(cart);
    let str = "";
    for (let i = 0; i < cart.length; i++) {
        str += `<li id="${cart[i].product.id}">
            <button onclick="removeFromCart('${cart[i].product.id}')">- remove</button> &nbsp;
            <span>${cart[i].product.name} - price: ${cart[i].product.price} - quantity: ${cart[i].qty}</span>
        </li>`
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