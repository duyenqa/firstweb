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
        </p>`;
        ul.innerHTML += `
        <li>
            ${inputValue}
            <span class="actions">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </span>
        </li>`;
    }
}