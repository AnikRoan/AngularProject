import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../interface/task.interface';




@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe], 
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  task: Task ={description: '', projectName: '', date: new Date(), time: ''}
  tasks: Task[] = [];
  displayedColumns: string[] = ['description', 'projectName', 'date', 'time','actions'];
  taskForm: FormGroup;

  
  constructor(private formBuilder:  FormBuilder, private datePipe: DatePipe){
      this.taskForm = this.formBuilder.group({
      description: [''],
      projectName: [''],
      date: [new Date()],
      time: ['']
     })
   }


  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
      this.tasks = JSON.parse(savedTasks)
    }

  }
  
  addTask(): void {
    if(this.taskForm.valid){
      const task = this.taskForm.value;
        if(!task.date){
           task.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
          }else{
           task.date = this.datePipe.transform(task.date, 'yyyy-MM-dd');
          
         }
         
      if(!task.time){
        task.time = this.getCurrentTime();
      }
      this.tasks.push(task);
    
      this.taskForm.reset({
        date: new Date()
      });
      
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
     
    }
   
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); 
    const minutes = now.getMinutes().toString().padStart(2, '0'); 
    return `${hours}:${minutes}`;
  }

  
  removeTask(taskId: number): void {
    console.log("Task ID "+taskId)
    this.tasks.splice(taskId, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
   }
}
