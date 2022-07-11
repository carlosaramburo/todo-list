package com.app.todo.todo.services;

import com.app.todo.todo.models.ToDo;

import java.util.List;

public interface ToDoService {

    public List<ToDo> getAllToDos();

    public ToDo getToDoById(Long id);

    public void saveToDo(ToDo toDo);

    public void deleteToDo(Long id);
}
