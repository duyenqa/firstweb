function addTodo() {
    let message = document.getElementById("notification");
    let inputValue = CKEDITOR.instances.richtext.getData();    
    let id = Date.now();

    if (inputValue == '') {
        alert("You must write something!");
    } else {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", `${id}`);
        tr.innerHTML += `
            <td>${id}</td>
            <td>${inputValue}</td>
            <td><i class="fa fa-trash" aria-hidden="true" onclick="deleteOneitem(${id})"></i></td>
        `;
        document.getElementById("todolist").appendChild(tr);

        //After created successfully, delete data of input tag
        CKEDITOR.instances.richtext.setData() = " ";

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
    const trToDelete = document.querySelector(`tr[data-id='${id}']`);
    
    if (trToDelete) {
        trToDelete.remove();
    }
}

function onClose() {
    document.getElementById('result').remove();
}