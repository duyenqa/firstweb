function addTodo() {
    let message = document.getElementById("notification");
    let ul = document.getElementById("list");
    let inputValue = document.getElementById("myInput").value;
    let id = Date.now();

    if (inputValue == '') {
        alert("You must write something!");
    } else {
        ul.innerHTML += `
        <li data-id=${id}>
            <span class="nameTodo">${inputValue}</span>
            <span class="actions">
                <i class="fa fa-trash" aria-hidden="true" onclick="deleteOneitem(${id})"></i>
            </span>
        </li>`;

        //After created successfully, delete data of input tag
        document.getElementById("myInput").value = " ";

        //Show message
        message.innerHTML += `
        <p id="result" class="message-success">
            <i class="fa fa-check" aria-hidden="true"></i>
            You created successfully
            <span id="close" onclick="onClose()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </span>
        </p>`;
    }
    
    setTimeout(() => {
        document.querySelector(".message-success").classList.add('show');
    }, 2000);
}

function deleteOneitem(id) {
    const ul = document.getElementById("list");
    const li = ul.querySelector(`li[data-id="${id}"]`); 

    if (li) {
        li.remove();
    } else {
        console.error("Element with ID " + id + " not found.");
    }
}

function onClose() {
    document.getElementById('result').remove();
}