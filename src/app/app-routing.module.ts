import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/page/home/home.component';
import { UserProfileComponent } from '@modules/user-profile/page/user-profile/user-profile.component';
import { AuthGuard } from '@core/guards/auth.guard';
import {LoginComponent} from '@modules/auth/page/login/login.component';
import {RegistrationComponent} from '@modules/auth/page/registration/registration.component';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
