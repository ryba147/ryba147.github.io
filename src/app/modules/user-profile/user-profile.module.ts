import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './page/user-profile/user-profile.component';
import { EditProfileComponent } from './page/edit-profile/edit-profile.component';
import { UserListComponent } from './page/user-list/user-list.component';
import { AddAnnouncementComponent } from './page/add-announcement/add-announcement.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    UserListComponent,
    AddAnnouncementComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
