import { Component, DestroyRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../../../models/Task.model';
import { TaskService } from '../../../../service/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
@Component({
  selector: 'app-task-single',
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
    MatCardModule,
  ],
  providers: [DatePipe],
  templateUrl: './task-single.component.html',
  styleUrl: './task-single.component.scss'
})
export class TaskSingleComponent implements OnInit, OnDestroy {
  taskHaveChangedSubscription: Subscription = new Subscription();
  
  @Input() addMode: boolean = false;
  private destroyRef = inject(DestroyRef);
  

  taskId: number = -1;
  editMode: boolean = false;
  taskForEdit: Task;
  taskForDisplay: Task;
  displayTask: boolean = false;
  isSingleTask: boolean = false;
  taskForm: FormGroup;

  constructor(
    public taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.taskForEdit = { ...this.taskService.emptyTask };
    this.taskForDisplay = { ...this.taskService.emptyTask };
    this.taskForm = this.formBuilder.group({
      project: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      time: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.taskHaveChangedSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscribeParams();
  }

  goToSingleTask(taskId: number) {
    this.router.navigate(['task-dashboard', taskId]);
  }

  goToTaskList() {
    this.router.navigate(['task-dashboard']);
  }
    
  subscribeParams() {
    this.route.params
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((params) => {
      console.log(params['taskId']);
      if (params['taskId']) {
        this.isSingleTask = true;
        this.taskId = params['taskId'];
        this.getTaskById();
        this.taskHaveChangedSubscription = this.taskService.taskHaveCanged.subscribe(() => {
          this.getTaskById();
        })
      }
    })
  }


  getTaskById() {
    if (this.taskId > 0) {
      this.taskService.getTask(this.taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res) {
            this.taskForDisplay = res;
            this.displayTask = true;
          }
        },
        error: (err) => { console.log(err) }
      })
    }

  }

  
    toggleEdit(editMode: boolean, task: Task = { ...this.taskService.emptyTask }) {
      this.editMode = editMode;
      this.taskForEdit = { ...task };
      
          if (editMode) {
            this.taskForm.patchValue({
              project: this.taskForEdit.project,
              description: this.taskForEdit.description,
              date: this.taskForEdit.date,
              time: this.taskForEdit.time
      
            });
          } else {
            this.taskService.taskHaveCanged.next(true);
          }
      
        }

        submitEdit() {
          if (this.addMode) {
            if (this.taskForm.valid) {
              this.taskForEdit = this.taskForm.value;
      
              if (this.taskForEdit.date) {
                this.taskForEdit.date = this.datePipe.transform(this.taskForEdit.date, 'yyyy-MM-dd');
              } else {
                this.taskForEdit.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
              }
      
              this.taskService.addTask(this.taskForEdit);
      
            } else {
              alert('Task data is incomplete.');
            }
            this.router.navigate(['task-dashboard']);
          } else {
            this.editMode = false;
            this.taskForEdit = this.taskForm.value;
            this.taskForEdit.id = this.taskId;
            this.taskService.editTask(this.taskForEdit);
            
          }
        }
      }
    
      




