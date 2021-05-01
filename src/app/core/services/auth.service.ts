import { Injectable } from '@angular/core';
import { AuthDetails } from '@app/models/auth-details';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@shared/constants';
import { User } from '@app/models/user';

@Injectable()
export class AuthService {

  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    // this.u = new BehaviorSubject<User>(this._user);
  }

  // getUser(): User | null {
  //   return this.u;
  // }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  get isLoggedIn(): Observable<boolean> {
    console.log('isLoggedIn| this.u !== null: ', this.userSubject.value !== null);
    return of(this.userSubject !== null);
  }

  authUser(searchQueryString: string): Observable<AuthDetails> {
    return this.http.get<AuthDetails>(
      `${Constants.apiURL}/users/login?${searchQueryString}`,
      { responseType: 'json' }
    );
  }
}
