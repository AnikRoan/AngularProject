import { Component } from '@angular/core';
import {  Router, RouterEvent, RouterModule, RouterOutlet } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { ErrorPageComponent } from './error/error-page/error-page.component'

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
export class AppComponent {
  title = 'task_tracker';
  isErrorPage: boolean = false;

  constructor(private router: Router) {
    this.router.events
     .subscribe((event) => {
      this.isErrorPage = this.router.url === '/error';
      
    });
  }
}
