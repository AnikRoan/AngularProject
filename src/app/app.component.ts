import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task_tracker';
}
