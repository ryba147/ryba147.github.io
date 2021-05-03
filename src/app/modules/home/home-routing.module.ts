import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/page/home/home.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { UserProfileComponent } from '@modules/user-profile/page/user-profile/user-profile.component';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    ]
  },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
