import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/core/services/user.service';
import {Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import { Constants } from "@shared/constants";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  users: User[];
  loading: boolean;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
  }

  getUsers(): void {
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
    });
  }

  logout():void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
