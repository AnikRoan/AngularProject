import { Component, DestroyRef, OnInit, } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { TaskSingleComponent } from './tasks/tasks/task-single/task-single/task-single.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './service/auth-service.service';
import { TokenResponse } from './models/tokenResponse-model.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ErrorPageComponent,
    CommonModule,
    FormsModule,
    TasksComponent,
    TaskSingleComponent,
    LoginComponent,
    RegisterComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,

  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  title = 'task_tracker';

  isErrorPage: boolean = false;
  private destroyRef = inject(DestroyRef);

  constructor(private router: Router,
    public authServ: AuthService,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'instagram-icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram-icon.svg')
    );
  }

  ngOnInit(): void {
    this.subscribeToErrorEvent();
    this.checkAuth();

  }
  checkAuth() {
    let token = localStorage.getItem('token');
    if (token !== null && token.length > 2) {
      this.authServ.isAuthenticated = true;
      this.authServ.token = token;
      this.authServ.getRefreshToken().subscribe({
        next: (res: TokenResponse) => {
          console.log("TOKEN" + res.token);
          this.authServ.handleLogin(res.token);


        }
      })

    }
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

