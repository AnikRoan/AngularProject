import { Injectable, DestroyRef, OnDestroy } from "@angular/core";
import { Task } from "../models/Task.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from "./auth-service.service";

@Injectable({ providedIn: 'root' })
export class TaskService implements OnDestroy {
   private taskListSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
   public taskList$: Observable<Task[]> = this.taskListSubject.asObservable();
   private isLoading = false;
   taskHaveCanged: Subject<boolean> = new Subject<boolean>();
   private destroyRef = inject(DestroyRef);

   emptyTask: Task = {
      id: 0,
      description: '',
      project: '',
      date: new Date(),
      time: ''
   };

   constructor(
      public httpService: HttpClient,
      private authService: AuthService) {
      this.loadTasks();
   }
   ngOnDestroy(): void {
      this.taskHaveCanged.unsubscribe();
   }

   private loadTasks() {
      if (!this.isLoading) {
         this.isLoading = true;
         this.httpService.get<Task[]>("tasks")
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
               next: (tasks) => {
                  console.log(tasks);
                  this.taskListSubject.next(tasks);
                  this.isLoading = false;
               },
               error: (err) => {
                  console.error(err);
                  this.isLoading = false;
               }
            });
      }
   }

   getTasks(): Observable<Task[]> {
      return this.taskList$;
   }

   getTask(taskId: number) {
      return this.httpService.get<Task>("tasks/" + taskId)
   }
   putTask(taskForEdit: Task): Observable<Task> {
      return this.httpService.put<Task>("tasks", taskForEdit);
   }
   postTask(taskForAdd: Task) {
      return this.httpService.post<Task>("tasks", taskForAdd)
   }
   deleteTask(taskId: number) {
      return this.httpService.delete("tasks/" + taskId)
   }

   editTask(task: Task) {
      this.putTask(task)
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe({
            next: () => {
               alert("The task has been edited");
               this.taskHaveCanged.next(false);
               this.loadTasks();
            },
            error: (err) => {
               console.log(err);
               alert("The task editing failed");
            }
         });
   }

   addTask(task: Task) {
      this.postTask(task)
         .pipe(takeUntilDestroyed(this.destroyRef))
         .subscribe({
            next: () => {
               alert("The task has been added");
               this.taskHaveCanged.next(false);
               this.loadTasks();
            },
            error: (err) => {
               console.log(err);
               alert("The task editing failed");
            }
         });
   }


   removeTask(index: number) {
      if (confirm("Are you sure you want to delete this task?")) {
         this.deleteTask(index)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
               next: () => {
                  alert("The task has been edited");
                  this.loadTasks();
               },
               error: (err) => {
                  console.log(err);
                  alert("The task editing failed");
               }
            });

      }
   }

}











