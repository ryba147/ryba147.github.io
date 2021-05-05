import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from '@app/models/announcement';
import { Observable } from 'rxjs';
import { Constants } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) {  }

  createAnnouncement(data: FormData): Observable<Announcement> {
    return this.http.post<Announcement>(`${Constants.API_URL}/announcements`, data, {responseType: 'json'});
  }

  getAnnouncementList(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${Constants.API_URL}/announcements`);
  }
}
