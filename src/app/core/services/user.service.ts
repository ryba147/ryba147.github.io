import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${Constants.API_URL}/users`);
  }
}
