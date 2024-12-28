let todos = [];
let currentPage = 1;
const itemsPerPage = 3;

function addTodo() {
    let inputValue = window.editor.getData();

    if (inputValue == '') {
        alert("You must write something!");
    } else {
        todos.push({
            id: Date.now(),
            name: inputValue,
            status: 'To do'
        });

        //After created successfully, delete data of editor
        window.editor.setData(" ");

        displayTodos();
    }
}

function displayTodos() {
    const todoTable = document.getElementById("todolist");
    todoTable.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const paginatedTodos = todos.slice(start, end);

    paginatedTodos.forEach(todo => {
        const tr = document.createElement("tr");
        tr.setAttribute("data-id", `${todo.id}`);
        tr.innerHTML += `
            <td>
                <input type="checkbox" onchange="toggleComplete(this)" ${todo.status === 'Completed' ? 'checked' : ''}>
            </td>
            <td class="task-name">${todo.name}</td>
            <td class="task-status">${todo.status}</td>
            <td>
                <i class="fa fa-trash" aria-hidden="true" onclick="deleteOneitem(${todo.id})"></i>
                &nbsp;
                <i class="fa fa-pencil" aria-hidden="true" onclick="updateOneitem(${todo.id})"></i>
            </td>
        `;
        todoTable.appendChild(tr);
    });
    displayPageNumbers();
}

const displayPageNumbers = () => {
    let totalPages = Math.ceil(todos.length / itemsPerPage);
    const pageNumbers = document.getElementById("pageNumbers");
    pageNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        let pageNumberElement = document.createElement("a");
        pageNumberElement.setAttribute('href', "#");
        pageNumberElement.textContent = i;

        pageNumberElement.addEventListener("click", function () {
            currentPage = i;
            displayTodos();
        });

        pageNumbers.appendChild(pageNumberElement);
    }
};

function toggleComplete(checkbox) {
    const taskRow = checkbox.closest("tr");
    const status = taskRow.querySelector(".task-status");
    const taskId = taskRow.getAttribute("data-id");
    const task = todos.find(todo => todo.id == taskId);

    if (!task) {
        return;
    }

    if (checkbox.checked) {
        task.status = "Completed";
        status.textContent = "Completed";
    } else {
        task.status = "To do";
        status.textContent = "To do";
    }
    displayTodos();
}

function deleteOneitem(todoId) {
    document.getElementById("popupDelete").style.display = "block";

    document.getElementById("close").addEventListener("click", () => {
        document.getElementById("popupDelete").style.display = "none";
    })

    document.getElementById("closebtn").addEventListener("click", () => {
        document.getElementById("popupDelete").style.display = "none";
    })

    document.getElementById("okbtn").addEventListener("click", () => {
        todos = todos.filter(todo => todo.id !== todoId);
        document.getElementById("popupDelete").style.display = "none";

        const totalPages = Math.ceil(todos.length / itemsPerPage);

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        displayTodos();
    })
}


function updateOneitem(id) {
    const taskRow = document.querySelector(`tr[data-id="${id}"]`);
    const taskNameCell = taskRow.querySelector('.task-name');

    const newTaskName = prompt("Edit the task description:", taskNameCell.innerText);

    if (newTaskName !== null && newTaskName !== "") {
        taskNameCell.innerText = newTaskName;
        const task = todos.find(todo => todo.id == id);
        if (task) {
            task.name = newTaskName;
        }
        displayTodos();
    }
}

function cancelTodo() {
    window.editor.setData(" ");
}

// document.getElementById("sheetjsexport").addEventListener('click', function () {
//     let wb = XLSX.utils.table_to_book(document.getElementById("todoTable"));
//     XLSX.writeFile(wb, "data.xlsx");
// });