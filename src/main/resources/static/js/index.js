// Selectors
const reloadBtn = document.getElementById("reloadBtn");
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("newTitleBtn");
const titleTask = document.getElementById("titleTask");
const alertToast = document.getElementById("liveToast");
const alertText = document.getElementById("toast-text");
const navBar = document.getElementById("myTab");
const TasksList = document.getElementById("TasksList");

const showToast = (status, message) => {
    let toast = new bootstrap.Toast(alertToast);
    alertText.innerHTML = message;
    if(status == "warning") {
        alertToast.classList.remove("text-bg-success");
        alertToast.classList.add("text-bg-danger");   
    }
    else if(status == "success") {
        alertToast.classList.remove("text-bg-danger");
        alertToast.classList.add("text-bg-success");
    }
    toast.show();
}

const renderTask = (task) =>  {
    const listItem = `<li class="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded task ${task.complete == true ? `complete` : `pending`}" value="${task.id}">
                        <div class="d-flex align-items-center ${task.complete == true ? `complete-text` : `pending-text`}">
                            <input type="checkbox" class="form-check-input me-2 checkTask" ${task.complete == true ? `checked` : ``} />
                            <p class="taskTitle">${task.title}</p>    
                        </div>
                        <div>
                            <a title="Update task" class="text-primary editBtn" data-bs-toggle="modal" data-bs-target="#editTitleModal"><i class="fa-solid fa-pen-to-square mx-2"></i></a>
                            <a title="Delete task" class="text-primary deleteBtn"><i class="fa-solid fa-trash-can"></i></a>
                        </div>
                      </li>`;
    TasksList.innerHTML += listItem;
}

const reloadTasks = async () => {
    const response = await getAllTasks();
    if(response) {
        TasksList.innerHTML = "";
        response.forEach(task => {
            renderTask(task);
        })
        showToast("success", "Tasks retrieved.");
        document.getElementsByClassName("filterBtn active")[0].click();          
    }
    else {
        showToast("warning", "Couldn't retrieve tasks.");
    }
}

const insertTask = async () => {
    if(titleTask.value == "") {
        document.getElementById("toast-text").innerHTML = "Please enter a task title.";
        showToast("warning", "Task title is required.");
    }
    else {
        const title = titleTask.value;
        const response = await addTask(title);
        if(response) {
            renderTask(response);
            showToast("success", "Task added succesfully.");
        }
        else {
            showToast("warning", "Couldn't add task.");
        }
        titleTask.value = "";
    }
}

const changeTaskStatus = (checkbox) => {
    if(checkbox.checked) {
        checkbox.parentElement.classList.remove("pending-text");
        checkbox.parentElement.classList.add("complete-text");
        checkbox.closest(".task").classList.remove("pending");
        checkbox.closest(".task").classList.add("complete");
    }
    else {
        checkbox.parentElement.classList.remove("complete-text");
        checkbox.parentElement.classList.add("pending-text");
        checkbox.closest(".task").classList.remove("complete");
        checkbox.closest(".task").classList.add("pending");
    }
    document.getElementsByClassName("filterBtn active")[0].click();
}

const removeTask = async (task) => {
    const response = await deleteTask(task.value);
    if(response == true) {
        task.remove();
        showToast("success", "Task deleted succesfully.");
    }
    else {
        showToast("success", "Couldn't delete succesfully.");
    }
}

const editTitle = async (id, title) => {
    const response = await updateTask(id, title, null);
    if(response == true) {
        showToast("success","Title edited succesfully.");
    }
    else {
        showToast("danger", "Couldn't edit title.");
    }
    return response;
}

const editStatus = async (id, status) => {
    const response = await updateTask(id, null, status);
    if(response == false) {
        showToast("danger", "Couldn't update task status.");
    } 
    return response;
}

TasksList.addEventListener("click", async (e) => {
    if(e.target.classList.contains("checkTask")) {
        const id = e.target.closest(".task").value;
        const status = e.target.checked;
        if(await editStatus(id, status) == true) {
            changeTaskStatus(e.target);
        }       
    }
    if(e.target.closest(".deleteBtn")) {
        await removeTask(e.target.closest(".task"));
    }
    if(e.target.closest(".editBtn")) {
        const id = e.target.closest(".task").value;
        const previousTitle = e.target.closest(".task").getElementsByClassName("taskTitle")[0];
        const newTitle = document.getElementById("newTitle");
        
        newTitle.value = previousTitle.innerHTML;
        editBtn.value = id;
        editBtn.setAttribute("previousTitle", previousTitle.innerHTML);
    }
})

editBtn.addEventListener("click", async () => {
    const id = editBtn.value;
    const previousTitle = editBtn.getAttribute("previousTitle");
    const newTitle = document.getElementById("newTitle");
    const tasks = document.getElementsByClassName("taskTitle");
    if(newTitle.value == "") {
        showToast("warning", "Task title is required.");
    }
    else {
        if(await editTitle(id, newTitle.value) == true) {
            for(const task of tasks) {
                if(task.innerHTML == previousTitle) {
                    task.innerHTML = newTitle.value;
                }
            }
        }
    }
    editBtn.value = "";
    editBtn.setAttribute("previousTitle", "");
    newTitle.value = 0;
})

reloadBtn.addEventListener("click", reloadTasks);
addBtn.addEventListener("click", insertTask);

navBar.addEventListener("click", (e) => {
    const tasks = document.getElementsByClassName("task");
    for(const task of tasks) {
        if(e.target.closest("#allBtn")) {
            task.classList.remove("d-none");
        }
        else if(e.target.closest("#pendingBtn")) {
            if(task.classList.contains("complete")) {
                task.classList.add("d-none");
            }
            else {
                task.classList.remove("d-none");
            }
        }
        else if(e.target.closest("#completedBtn")) {
            if(task.classList.contains("pending")) {
                task.classList.add("d-none");
            }
            else {
                task.classList.remove("d-none");
            }
        }
    }
})