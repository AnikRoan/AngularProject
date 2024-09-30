import { Component, OnDestroy, OnInit,} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { Subject} from 'rxjs';

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TaskDashboardComponent,
    ErrorPageComponent,
    CommonModule
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task_tracker';
  private unsubscribe$ = new Subject<void>();
  isErrorPage: boolean = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
     this.router.events.subscribe((event) => {
      this.isErrorPage = this.router.url === '/error';
      console.log("Current isErrorPage status:", this.isErrorPage);
    });
  }

  ngOnDestroy(): void {
     this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
