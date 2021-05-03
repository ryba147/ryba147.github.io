import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users: User[];
  loading: boolean;
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
