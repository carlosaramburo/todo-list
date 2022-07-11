package com.app.todo.todo.controllers;

import com.app.todo.todo.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RouteController {
    @Autowired
    private ToDoService toDoService;

    @GetMapping("/")
    public String listToDos(Model model) {
        model.addAttribute("tasks", toDoService.getAllToDos());

        return "index";
    }
}
