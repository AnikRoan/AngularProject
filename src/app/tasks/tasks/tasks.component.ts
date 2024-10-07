import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../service/task-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TaskSingleComponent } from "./task-single/task-single/task-single.component";

@Component({
  selector: 'app-tasks',
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
    ReactiveFormsModule,
    TaskSingleComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, OnDestroy {

  taskHaveChangedSubscription: Subscription = new Subscription();
  addingNewTask: boolean = false;

  constructor(
    public taskService: TaskService) { }

  addNewTask() {
    this.addingNewTask = true;
  }

  ngOnDestroy(): void {
    this.taskHaveChangedSubscription.unsubscribe();
    console.log("component has been destroyed");
  }

  ngOnInit(): void {
    this.taskHaveChangedSubscription = this.taskService.taskHaveCanged
      .subscribe((changesCanseled: boolean) => {
        if (!changesCanseled) {

          this.addingNewTask = false;

        }
      })

    console.log("component has been created");

  }

}
