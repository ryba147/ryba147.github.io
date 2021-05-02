import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/core/services/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) {
  }

  getUsers(): void {
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  logout():void {
    return;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
