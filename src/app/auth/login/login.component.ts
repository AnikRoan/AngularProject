import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service.service';
import { Login } from '../../models/Login.model';
import { TokenResponse } from '../../models/TokenResponse.model';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  login: Login;


  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    public authServ: AuthService) {
    this.login = { ...this.authServ.emptyLogin };
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  goToRegistration(event: Event) {
    event.preventDefault();
    this.router.navigate(["register"]);

  }
  submitLogin() {
    
    this.login = this.loginForm.value
    this.authServ.postLogin(this.login)
    .subscribe({
      next: (res: TokenResponse) => {
        alert("Login successful");
        // console.log(res);
        this.authServ.handleLogin(res.token).then(()=>{
          this.router.navigate(["task-dashboard"]);
        });
      },
      error: (err: any) => {
        console.log(err);
        alert("Login failed");
      }
    })
  }
}
