import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/models/user';
import { Constants } from '@shared/constants';
import { AuthDetails } from '@app/models/auth-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {  }

  setUser(data: AuthDetails): void {
    localStorage.setItem('currentUser', JSON.stringify(data.userData));
    localStorage.setItem('authHeader', JSON.stringify(data.authHeader));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  createUser(data: FormData): Observable<User> {
    return this.http.post<User>(`${Constants.API_URL}/users`, data, { responseType: 'json' });
  }

  updateUser(id: number, data: FormData): Observable<AuthDetails> {
    return this.http.put<AuthDetails>(`${Constants.API_URL}/users/${id}`, data, { responseType: 'json' });
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${Constants.API_URL}/users/${id}`, {responseType: 'json'});
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${Constants.API_URL}/users`);
  }
}
