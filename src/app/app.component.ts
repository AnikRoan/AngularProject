import { Component, DestroyRef, OnInit,} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { filter } from 'rxjs/operators';



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
export class AppComponent implements OnInit {
  title = 'task_tracker';
 
  isErrorPage: boolean = false;
  private destroyRef = inject(DestroyRef);

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.subscribeToErrorEvent();
  }

  subscribeToErrorEvent(): void {
    this.router.events
    .pipe(takeUntilDestroyed(this.destroyRef),
          filter(event => event instanceof NavigationEnd))
    
    .subscribe((event) => {
      this.isErrorPage = this.router.url === '/error';
      console.log("Current isErrorPage status:", this.isErrorPage);
      
    });
  }

 

}
