import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private userService: UserService) {
  }

  getUsers(): void {
    this.userService.getUserList().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
