import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private userService: UserService) {}

  isDisabled(): boolean {
    return false;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }
}
