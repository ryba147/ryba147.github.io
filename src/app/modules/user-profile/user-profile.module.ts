import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './page/user-profile/user-profile.component';
import { EditProfileComponent } from './page/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
