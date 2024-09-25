import { Component, EventEmitter, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

interface Task {
  description: string;
  projectName: string;
  date: Date;
  time: string;
  taskId: number;
}

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
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  task: Task ={description: '', projectName: '', date: new Date(), time: '', taskId: 0}
  tasks: Task[] = [];
  displayedColumns: string[] = ['description', 'projectName', 'date', 'time','actions'];
  deleteTask: EventEmitter<number> = new EventEmitter<number>();
  taskForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
  });

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
      this.tasks = JSON.parse(savedTasks)
    }

  }
  
  addTask(): void {
    if(this.taskForm.valid){
      const task = this.taskForm.value;
      task.taskId = this.generateTaskId();

         if(!task.date){
           task.date = new Date().toISOString().split('T')[0];
         }else{
           task.date = new Date(task.date).toISOString().split('T')[0];
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
  generateTaskId(): number {
    return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.taskId)) + 1 : 1;
  }
  
  removeTask(taskId: number): void {
    this.tasks.splice(taskId, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    
  }
}
