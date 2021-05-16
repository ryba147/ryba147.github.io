import { Injectable } from '@angular/core';
import { AuthDetails } from '@app/models/auth-details';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@shared/constants';

/**
 * Service for user authentication. Grant rights after login
 * or remove them with an auth header.
 **/

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get isLoggedIn(): boolean {
    return !!(localStorage.getItem('authHeader') && localStorage.getItem('currentUser'));
  }

  authUser(searchQueryString: string): Observable<AuthDetails> {
    return this.http.get<AuthDetails>(
      `${Constants.API_URL}/users/login?${searchQueryString}`,
      { responseType: 'json' }
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authHeader');
  }
}
