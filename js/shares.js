const shareBtn = document.getElementById("share-btn");
shareBtn.addEventListener("click", async () => {
    try{
        await navigator.share({
            title: "InTech",
            text: "Trang web này dành cho kiểm thử",
            url:"https://duyenqa.github.io/firstweb/"
        })
    }catch(error){
        console.log(error);
    }
})