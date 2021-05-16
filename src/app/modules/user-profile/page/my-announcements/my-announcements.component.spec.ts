import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnouncementsComponent } from './my-announcements.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyAnnouncementsComponent', () => {
  let component: MyAnnouncementsComponent;
  let fixture: ComponentFixture<MyAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MyAnnouncementsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnnouncementsComponent);
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
    component.currentUser.id = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
