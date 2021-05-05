import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '@core/services/announcement.service';
import { Announcement } from '@app/models/announcement';
import { Constants } from '@shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  announcements: Announcement[];
  loading = false;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private announcementService: AnnouncementService) {}

  getAnnouncements(): void {
    this.loading = true;
    this.announcementService.getAnnouncementList().subscribe((data) => {
      this.loading = false;
      this.announcements = data;
    });
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }
}
