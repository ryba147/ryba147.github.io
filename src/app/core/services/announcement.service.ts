import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAnnouncementsByAuthorId(id: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${Constants.API_URL}/announcements/filter_by`, {
      params: new HttpParams().set('author_id', id.toString()),
    });
  }

  getAnnouncementList(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${Constants.API_URL}/announcements`);
  }
}
