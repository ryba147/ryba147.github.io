import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContentLayoutComponent} from "@app/layouts/content-layout/content-layout.component";
import {AuthGuard} from "@core/guards/auth.guard";
import {LoginComponent} from "@modules/auth/page/login/login.component";
import {RegistrationComponent} from "@modules/auth/page/registration/registration.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@modules/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
