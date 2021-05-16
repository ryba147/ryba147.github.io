import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Constants } from '@shared/constants';
import { User } from '@app/models/user';

describe('UserService', () => {
  let service: UserService;
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
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
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
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save user to localStorage', () => {
    service.setUser(authDetails);
    expect(localStorage.getItem('currentUser')).toEqual(
      JSON.stringify(authDetails.userData)
    );
  });

  it('should return user from localstorage', () => {
    service.setUser(authDetails);
    expect(service.getUser()).toEqual(authDetails.userData);
  });

  it('should delete user', () => {
    service.deleteUser(authDetails.userData.id).subscribe((data: User) => {
      console.log(data);
      expect(data).toBeTruthy();
      // expect(data).toEqual(authDetails.userData);
    });

    const req = httpMock.expectOne(
      `${Constants.API_URL}/users/${authDetails.userData.id}`,
      'delete call to API'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(authDetails);
    httpMock.verify();
  });

  it('should post the correct data', function () {
    const formData = new FormData();

    for (const key of Object.keys(authDetails.userData)) {
      const value = authDetails.userData[key];
      formData.append(key, value);
    }

    service.createUser(formData).subscribe((data: User) => {
      expect(data).toEqual(authDetails.userData);
    });

    const req = httpMock.expectOne(`${Constants.API_URL}/users`, 'post call to API');
    expect(req.request.method).toBe('POST');
  });
});
