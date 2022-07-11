const getAllTasks = async () => {
    const response = await fetch("http://localhost:8080/api/toDo");
    if(!response.ok) {
        return null;
    }
    else {
        return await response.json();
    }
}

const addTask = async (title) => {
    const response = await fetch("http://localhost:8080/api/toDo", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title})
    });
    if(!response.ok) {
        return false;
    }
    return await response.json();
}

const deleteTask = async (id) => {
    const response = await fetch("http://localhost:8080/api/toDo/" + id, {method: 'DELETE'});
    if(!response.ok) {
        return false;
    }
    else {
        return true;
    }
}

const updateTask = async (id, title, complete) => {
    const response = await fetch("http://localhost:8080/api/toDo/" + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: title, complete: complete})
    });
    if(!response.ok) {
        return false;
    }
    return true;
}