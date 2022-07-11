package com.app.todo.todo.controllers;

import com.app.todo.todo.models.ToDo;
import com.app.todo.todo.services.ToDoService;
import com.app.todo.todo.utils.NullUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.List;

@RestController
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping("/api/toDo")
    public List<ToDo> getAllToDos () {
        return toDoService.getAllToDos();
    }

    @GetMapping("/api/toDo/{id}")
    public ResponseEntity<ToDo> getToDo (@PathVariable Long id) {
        try {
            ToDo todo = toDoService.getToDoById(id);
            return new ResponseEntity<ToDo>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<ToDo>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/api/toDo")
    public ResponseEntity<?> saveToDo(@RequestBody ToDo toDo) {
        try {
            toDo.setId(null);
            toDo.setComplete(false);
            toDoService.saveToDo(toDo);
            return new ResponseEntity<>(toDo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
     }

    @PatchMapping("/api/toDo/{id}")
    public ResponseEntity<?> updateToDo(@RequestBody ToDo toDo, @PathVariable Long id) {
        try {
            ToDo existingToDo = toDoService.getToDoById(id);


            //System.out.println(toDo.getComplete());
            //existingToDo.setTitle(toDo.getTitle());
            //existingToDo.setComplete(toDo.getComplete());
            /*if(toDo.getTitle() != null) {

            }
            if(toDo.getComplete() != null) {

            }*/

            NullUtil.updateIfPresent(existingToDo::setTitle, toDo.getTitle());
            NullUtil.updateIfPresent(existingToDo::setComplete, toDo.getComplete());

            toDoService.saveToDo(existingToDo);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/toDo/{id}")
    public ResponseEntity<?> deleteToDo(@PathVariable Long id) {
        try {
            toDoService.deleteToDo(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
