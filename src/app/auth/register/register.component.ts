import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service.service';
import { Registration } from '../../models/registration-model.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registration: Registration;
  registerForm: FormGroup;

  constructor(
    public authServ: AuthService,
    private formBuilder: FormBuilder,
  private router: Router) {
      this.registration ={...this.authServ.emptyRegister};
      this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      })

  }
  submitRegistration() {
    console.log(this.registerForm.value);
    this.registration = this.registerForm.value;
    this.authServ.postRegister(this.registration)
    .subscribe({
      next: (res)=>{
       alert("Registration successful");
       this.router.navigate(["login"]);
      },
      error: (err) => {
        console.log(err);
        alert("Registration failed");
      }
    })
  }

}
