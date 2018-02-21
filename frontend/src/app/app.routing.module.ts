import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AnonymousGuard } from './anonymous.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodolistComponent } from './todolist/todolist.component';

const appRoutes: Routes = [
    {
        path: 'welcome',
        component: LoginComponent,
        canActivate: [AnonymousGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'todo',
        component: TodolistComponent,
        canActivate: [AuthGuard]
    },
    { path: '', redirectTo: 'welcome' , pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard,
        AnonymousGuard
    ]
})
export class AppRoutingModule { }