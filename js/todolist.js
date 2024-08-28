function addTodo() {
    let message = document.getElementById("notification");
    let ul = document.getElementById("list");
    let inputValue = document.getElementById("myInput").value;

    if (inputValue == '') {
        alert("You must write something!");
    } else {
        message.innerHTML += `
        <p class="message-success">
            <i class="fa fa-check" aria-hidden="true"></i>
            You created successfully
            <span id="close" onclick="onClose()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </span>
        </p>`;
        
        ul.innerHTML += `
        <li>
            <span class="nameTodo">${inputValue}</span>
            <span class="actions">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </li>`;
    }
    
    setTimeout(() => {
        document.querySelector(".message-success").classList.add('show');
    }, 2000);
}

function onClose() {
    document.querySelector(".message-success").classList.remove('show');
}