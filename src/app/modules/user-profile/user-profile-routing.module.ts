import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from '@modules/user-profile/page/edit-profile/edit-profile.component';
import { AuthGuard } from '@core/guards/auth.guard';
import {UserProfileComponent} from "@modules/user-profile/page/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'edit', component: EditProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
