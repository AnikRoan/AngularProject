import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { TaskSingleComponent } from './tasks/tasks/task-single/task-single/task-single.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './architecture/auth-guard.guard';

export const routes: Routes = [
    { path: "login", loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: "register", loadComponent:()=>import('./auth/register/register.component').then(m=>m. RegisterComponent)},
    {
        path: "", canActivate: [authGuard], children: [

            {
                path: "task-dashboard", children: [
                    {
                        path: "",
                        loadComponent: () => import('./tasks/tasks/tasks.component').then(m => m.TasksComponent)
                    },
                    {
                        path: ":taskId",
                        loadComponent: () => import('./tasks/tasks/task-single/task-single/task-single.component').then(m => m.TaskSingleComponent)
                    }

                ]
            },

        ]
    },



    {
        path: 'error',
        loadComponent: () => import('./error/error-page/error-page.component').then(m => m.ErrorPageComponent),
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: '/error' }
];
