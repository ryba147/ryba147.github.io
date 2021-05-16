import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthDetails } from '@app/models/auth-details';
import { Constants } from '@shared/constants';

describe('AuthService', () => {
  let service: AuthService;
  const queryLoginString = 'username=admin&password=admin2';
  let httpMock: HttpTestingController;

  const authDetails = {
    authHeader: 'YWRtaW46YWRtaW4=',
    userData: {
      email: 'taras.vilinskyi@lpnu.ua',
      firstname: 'Taras',
      id: 1,
      img_name: 'sk9zjkwxjmlqq2vrcgq0',
      lastname: 'Vilisnkyi',
      location: 1,
      password: '$2b$12$X1tBtEGG4cO6y2OaZd4T7.frwrdEOYBox/JO8uUgDkshKyieDMoii',
      role: 'admin',
      username: 'admin',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should auth user', () => {
    service.authUser(queryLoginString).subscribe((response: AuthDetails) => {
      expect(response).toEqual(authDetails);
    });

    const req = httpMock.expectOne(`${Constants.API_URL}/users/login?${queryLoginString}`, 'login call to API');
    expect(req.request.method).toBe('GET');

    req.flush(req);
    httpMock.verify();
  });

  it('should logout user', () => {
    service.logout();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('authHeader')).toBeNull();
  });
});
