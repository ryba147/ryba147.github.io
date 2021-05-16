import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileComponent } from './edit-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { User } from '@app/models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let service: MockedUserService;

  const fakeUserService = jasmine.createSpyObj("fakeUserService", ["getUser"]);

  class MockedUserService {
    getUser(): User {
      return {
        id: 1,
        email: 'taras.vilinskyi@lpnu.ua',
        firstname: 'Taras',
        img_name: 'sk9zjkwxjmlqq2vrcgq0',
        lastname: 'Vilisnkyi',
        location: 1,
        password:
          '$2b$12$X1tBtEGG4cO6y2OaZd4T7.frwrdEOYBox/JO8uUgDkshKyieDMoii',
        role: 'admin',
        username: 'admin',
      };
    }
  }

  beforeEach(() => {
    service = new MockedUserService();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [EditProfileComponent],
      providers: [{ provide: UserService, useClass: MockedUserService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    component.currentUser = service.getUser();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track file input change', () => {
    const input  = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
    spyOn(component, 'onFileChange');
    input.dispatchEvent(new Event('change'));
    expect(component.onFileChange).toHaveBeenCalled();
  });
});
