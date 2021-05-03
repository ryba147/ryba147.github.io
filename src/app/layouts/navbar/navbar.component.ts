import { Component, OnInit } from '@angular/core';
import { User } from "@app/models/user";
import { Constants } from '@shared/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
