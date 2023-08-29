import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  constructor(
    private taskService : TaskService,
    private activatedRoute : ActivatedRoute,
    private toastr : ToastrService
  ){
  }
  tasks : any;
  ngOnInit(): void {
      this.getTasks();

      this.activatedRoute.queryParams.subscribe((params) => {
        if(params['save'] !== undefined && params['save'] === 'true')
        {
          this.toastr.success("Task Saved Successfully")
        }
      });
  }
  
  getTasks() {
    console.log('get Tasks')
    this.taskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(data); // Logging the data received from the service
      },
      error: (error) => {
        this.toastr.error('Failed to get task list');
        throw error;
      }
    });
  }
}




