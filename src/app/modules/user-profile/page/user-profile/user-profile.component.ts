import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
