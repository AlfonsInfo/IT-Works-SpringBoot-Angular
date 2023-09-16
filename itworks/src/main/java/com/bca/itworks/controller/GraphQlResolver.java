package com.bca.itworks.controller;
import com.bca.itworks.model.Task;
import com.bca.itworks.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Slf4j
@RestController
public class GraphQlResolver {
    @Autowired
    private TaskService taskService;
    @QueryMapping
    @GetMapping("list-of-tasks")
    public List<Task> tasks()
    {
        log.info("Getting task list...");
        try{
            List<Task> tasks = taskService.getAll();
            return tasks;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    @QueryMapping(value = "task_by_id")
    public Task taskById(@Argument String id)
    {
        log.info("Getting task...");
        try{
            Task task = taskService.findById(id);
            return task;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
