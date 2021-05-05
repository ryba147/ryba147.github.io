import { Component, OnInit } from '@angular/core';
import { Announcement } from '@app/models/announcement';
import { Constants } from '@shared/constants';
import { AnnouncementService } from '@core/services/announcement.service';
import { User } from '@app/models/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-my-announcements',
  templateUrl: './my-announcements.component.html',
  styleUrls: ['./my-announcements.component.scss']
})
export class MyAnnouncementsComponent implements OnInit {

  announcements: Announcement[];
  currentUser: User;
  loading = false;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private announcementService: AnnouncementService, private userService: UserService) {}

  getMyAnnouncements(): void {
    this.loading = true;
    this.currentUser = this.userService.getUser();
    this.announcementService.getAnnouncementsByAuthorId(this.currentUser.id).subscribe((data) => {
      this.loading = false;
      this.announcements = data;
    });
  }

  ngOnInit(): void {
    this.getMyAnnouncements();
  }

}
