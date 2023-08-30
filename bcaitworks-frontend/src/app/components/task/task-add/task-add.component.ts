import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/service/task.service';
import { ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  addForm! : FormGroup;
  form : any;
  constructor(
    private taskService : TaskService,
    private router : Router,
    private toastr : ToastrService
  )
  {
    this.form = {
      title: ""
    };
  }

  ngOnInit(): void {
      this.addForm = new FormGroup({
          title: new FormControl('', Validators.required)
      });
  }

  addTask(){
    if(this.addForm.invalid){
      this.toastr.error("Task cannot be empty!");
      return;
    }

    this.form.title = this.addForm.get('title')?.value;

    this.taskService.add(this.form).subscribe({
      next: () => this.router.navigate(["/tasks"], { queryParams: { save: 'true' } }),
      error: (error) => {
        console.error('Error while saving:', error);
        return this.toastr.error("Failed to save task! please try again");
      } 
    });
  }

}
