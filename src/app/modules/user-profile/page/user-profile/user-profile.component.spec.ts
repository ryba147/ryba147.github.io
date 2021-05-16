import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.currentUser = {
      id: 1,
      email: 'taras.vilinskyi@lpnu.ua',
      firstname: 'Taras',
      img_name: 'sk9zjkwxjmlqq2vrcgq0',
      lastname: 'Vilisnkyi',
      location: 1,
      password: '$2b$12$X1tBtEGG4cO6y2OaZd4T7.frwrdEOYBox/JO8uUgDkshKyieDMoii',
      role: 'admin',
      username: 'admin',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
