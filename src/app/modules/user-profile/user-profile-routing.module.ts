import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from '@modules/user-profile/page/edit-profile/edit-profile.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { UserProfileComponent } from '@modules/user-profile/page/user-profile/user-profile.component';
import { UserListComponent } from '@modules/user-profile/page/user-list/user-list.component';
import { RoleGuard } from '@core/guards/role.guard';
import { AddAnnouncementComponent } from '@modules/user-profile/page/add-announcement/add-announcement.component';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/user-list',
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin'
    },
  },
  {
    path: 'admin/add-announcement',
    component: AddAnnouncementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
