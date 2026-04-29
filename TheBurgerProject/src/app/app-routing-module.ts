import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { SignupComponent } from './components/signup-component/signup-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

export const routes: Routes = [
  { path: '', component: LoginComponent, data: { public: true } },
  { path: 'login', redirectTo: '' },
  { path: 'signup', component: SignupComponent, data: { public: true } },
  { path: 'dashboard', component: DashboardComponent, data: { public: false } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
