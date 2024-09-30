import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'task-dashboard',
        loadComponent: () => import('./task-dashboard/task-dashboard.component').then(m => m.TaskDashboardComponent),
    },
    {
        path: 'error',
        loadComponent: () => import('./error/error-page/error-page.component').then(m => m.ErrorPageComponent),
    },
    { path: '', redirectTo: '', pathMatch: 'full' },  
    { path: '**', redirectTo: '/error' } 
];
