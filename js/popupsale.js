const openPopUpSale = document.getElementById("popup");
const closePopUp = document.getElementById("closeSale");

window.onload = function () {
    setTimeout(function () {
        openPopUpSale.style.display = "block";
        openPopUpSale.style.width = "100%";
        Notification.requestPermission().then(permission => {
            alert(permission);
        });
    }, 2000)

    closePopUp.addEventListener("click", () => {
        openPopUpSale.style.display = "none";
    })
}