import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import {Constants} from "@shared/constants";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
