import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { AnnouncementService } from '@core/services/announcement.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  userAnnouncementsNo = 0;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private authService: AuthService, private userService: UserService, private announcementService: AnnouncementService, private router: Router) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  userAnnouncements(): void {
    this.announcementService
      .getAnnouncementsByAuthorId(this.currentUser.id)
      .subscribe((data) => {
        console.log(data);
        this.userAnnouncementsNo = data.length;
      });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    console.log(this.currentUser.id);
    this.userAnnouncements();
  }
}
