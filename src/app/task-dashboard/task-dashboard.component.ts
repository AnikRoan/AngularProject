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
export class TaskDashboardComponent implements OnInit {//логика которая виполница при инициализации
  
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
    //this.task.taskId = this.generateTaskId();
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
//Метод ngOnInit: Он предназначен для выполнения кода, который необходимо 
//запустить после того, как Angular проинициализирует все входные параметры
// компонента, но перед тем, как отображать его. Обычно это используется 
// для загрузки данных, настройки зависимостей и выполнения других подготовительных операций.
//ngIf, ngFor, ngSwitch, ngClass, ngStyle
// click, mouseenter, mouseleave
//OnInit ітерфейс
//Директива *ngIf используется для условного отображения элемента в шаблоне.
// Если выражение, указанное в ngIf, истинно, элемент будет отображаться,
 // в противном случае — удаляться из DOM.

 //Директива *ngFor используется для отображения списка элементов на основе массива данных.
 // Она итерирует по коллекции и создает элемент для каждого элемента массива.

 //ngSwitch работает аналогично конструкции switch-case в других языках программирования.
 // Она используется для отображения одного из нескольких возможных вариантов на основе значения выражения.

 //<div [ngSwitch]="color">
 // <p *ngSwitchCase="'red'">Red color selected</p>
 // <p *ngSwitchCase="'blue'">Blue color selected</p>
 // <p *ngSwitchDefault>Other color selected</p>
//</div>

//Директива ngClass позволяет динамически добавлять 
//или удалять CSS-классы для элемента на основе логики, определенной в компоненте.
//<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
//Click me!
//</div>

//Директива ngStyle позволяет динамически управлять стилями элемента на основе значений, переданных в выражении.
//<div [ngStyle]="{'color': textColor, 'font-size.px': fontSize}">
//This is a styled text!
//</div>