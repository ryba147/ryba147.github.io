import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from '@modules/auth/page/registration/registration.component';
import { LoginComponent } from '@modules/auth/page/login/login.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { HomeComponent } from '@modules/home/page/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: RegistrationComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
