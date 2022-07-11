package com.app.todo.todo.models;

import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "task")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 80)
    private String title;

    @Column(name = "complete", nullable = false)
    private Boolean complete;

    public ToDo(Long id, String title, Boolean complete) {
        this.id = id;
        this.title = title;
        this.complete = complete;
    }

    public ToDo() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getComplete() {
        return complete;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }
}
