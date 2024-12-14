function addTodo() {
    let inputValue = CKEDITOR.instances.richtext.getData();    
    let id = Date.now();

    if (inputValue == '') {
        alert("You must write something!");
    } else {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", `${id}`);
        tr.innerHTML += `
            <td>
                <input type="checkbox" onchange="toggleComplete(this)">
            </td>
            <td>${inputValue}</td>
            <td><i class="fa fa-trash" aria-hidden="true" onclick="deleteOneitem(${id})"></i></td>
        `;
        document.getElementById("todolist").appendChild(tr);

        //After created successfully, delete data of input tag
        CKEDITOR.instances.richtext.setData() = " ";
    }
}

function toggleComplete(checkbox) {
    const taskItem = checkbox.parentElement.nextElementSibling;
    if (checkbox.checked) {
        taskItem.classList.add("completed");
    } else {
        taskItem.classList.remove("completed");
    }
}

function deleteOneitem(id) {
    document.getElementById("popupDelete").style.display = "block";

    document.getElementById("close").addEventListener("click", () => {
        document.getElementById("popupDelete").style.display = "none";
    })

    document.getElementById("closebtn").addEventListener("click", () => {
        document.getElementById("popupDelete").style.display = "none";
    })

    document.getElementById("okbtn").addEventListener("click", () => {
        const trToDelete = document.querySelector(`tr[data-id='${id}']`);
    
        if (trToDelete) {
            trToDelete.remove();
            document.getElementById("popupDelete").style.display = "none";
        }
    })
}