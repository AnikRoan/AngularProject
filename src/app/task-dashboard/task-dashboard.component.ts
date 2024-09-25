import { Component, EventEmitter, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
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
    CommonModule
  ],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {
  
  task: Task ={description: '', projectName: '', date: new Date(), time: '', taskId: 0}
  tasks: Task[] = [];
  displayedColumns: string[] = ['description', 'projectName', 'date', 'time','actions'];
  deleteTask: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks')
    if(savedTasks){
      this.tasks = JSON.parse(savedTasks)
    }
  }
  
  addTask(): void {
   
    this.tasks.push({...this.task});
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    this.task = {description: '', projectName: '', date: new Date(), time: '', taskId: this.generateTaskId()}
  }
  generateTaskId(): number {
    return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.taskId)) + 1 : 1;
  }
  
  removeTask(taskId: number): void {
    this.tasks.splice(taskId, 1)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
    
  }
}
