let carts = JSON.parse(localStorage.getItem('cart')) || [];
let data = JSON.parse(localStorage.getItem("username")) || {};
const dataDeliveries = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Address', value: data.address },
    { label: 'District', value: data.district },
    {label: 'Province', value: data.province},
    { label: 'Phone', value: data.phone }
];

const dataPayments = [
    {label: 'Name', value: data.name},
    {label: 'Email', value: data.email},
    {label: 'Phone', value: data.phone}
];

document.getElementById("name").innerHTML = `<strong>${data.name}</strong>`;

dataPayments.forEach(field => {
    const p = document.createElement('p');
    p.innerHTML = `<span><strong>${field.label}:</strong> ${field.value}</span>`;
    document.getElementById("infopayment").appendChild(p);
});

dataDeliveries.forEach(field => {
    const p = document.createElement('p');
    p.innerHTML = `<span><strong>${field.label}:</strong> ${field.value}</span>`;
    document.getElementById("infoDelivery").appendChild(p);
});

function onSubmitCart() {
    // Clear the cart in localStorage
    localStorage.removeItem('cart');
    carts = [];
    // Clear username in localStorage
    localStorage.removeItem('username');

    //Go back home page
    window.location.href = "../index.html";
}