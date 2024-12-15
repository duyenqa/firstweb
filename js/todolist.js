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
            <td class="task-status">To do</td>
            <td><i class="fa fa-trash" aria-hidden="true" onclick="deleteOneitem(${id})"></i></td>
        `;
        document.getElementById("todolist").appendChild(tr);

        //After created successfully, delete data of input tag
        CKEDITOR.instances.richtext.setData() = " ";
    }
}

function toggleComplete(checkbox) {
    const taskRow = checkbox.closest("tr");
    const taskCell = taskRow.querySelector("td:nth-child(2)");
    const status = taskRow.querySelector(".task-status");

    if (checkbox.checked) {
        taskCell.classList.add("completed");
        status.textContent = "Completed";
    } else {
        taskCell.classList.remove("completed");
        status.textContent = "To do";
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

function cancelTodo(){
    CKEDITOR.instances.richtext.setData() = " ";
}

document.getElementById("sheetjsexport").addEventListener('click', function() {
    let wb = XLSX.utils.table_to_book(document.getElementById("todoTable"));
    XLSX.writeFile(wb, "data.xlsx");
});