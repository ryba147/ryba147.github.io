import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '@core/services/user.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: jasmine.SpyObj<UserService>;

  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/profile' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserProfileComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getUser.and.returnValue({
      id: 1,
      email: 'taras.vilinskyi@lpnu.ua',
      firstname: 'Taras',
      img_name: 'sk9zjkwxjmlqq2vrcgq0',
      lastname: 'Vilisnkyi',
      location: 1,
      password: '$2b$12$X1tBtEGG4cO6y2OaZd4T7.frwrdEOYBox/JO8uUgDkshKyieDMoii',
      role: 'admin',
      username: 'admin',
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.currentUser.id).toBe(1);
  });
});
