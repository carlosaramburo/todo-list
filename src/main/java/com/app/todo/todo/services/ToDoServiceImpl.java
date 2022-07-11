package com.app.todo.todo.services;

import com.app.todo.todo.models.ToDo;
import com.app.todo.todo.repositories.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoServiceImpl implements ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    @Override
    public List<ToDo> getAllToDos() {
        return toDoRepository.findAll();
    }

    @Override
    public ToDo getToDoById (Long id) {
        return toDoRepository.findById(id).get();
    }

    @Override
    public void saveToDo(ToDo toDo) {
        toDoRepository.save(toDo);
    }

    @Override
    public void deleteToDo(Long id) {
        toDoRepository.deleteById(id);
    }
}
