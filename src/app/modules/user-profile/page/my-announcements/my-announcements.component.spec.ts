import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnouncementsComponent } from './my-announcements.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnnouncementService } from '@core/services/announcement.service';
import { UserService } from '@core/services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Announcement } from '@app/models/announcement';
import { of } from 'rxjs';

describe('MyAnnouncementsComponent', () => {
  let component: MyAnnouncementsComponent;
  let fixture: ComponentFixture<MyAnnouncementsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let announcementService: jasmine.SpyObj<AnnouncementService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);
    const announcementServiceSpy = jasmine.createSpyObj('AnnouncementService', [
      'getAnnouncementsByAuthorId',
    ]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MyAnnouncementsComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AnnouncementService, useValue: announcementServiceSpy },
      ],
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

    const mockedAnnouncementList: Announcement[] = [
      {
        "author_id": 2,
        "description": "This is what you are looking for!",
        "event_date": "2021-04-14T02:05",
        "id": 2,
        "img_name": "kw0stljqbbkn35euqfvb",
        "location": 1,
        "pub_date": "2021-04-20T02:05:53.892121",
        "title": "Some title",
        "type": 2
      },
      {
        "author_id": 1,
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        "event_date": "2021-04-14T02:11",
        "id": 3,
        "img_name": "uzqirchqdihtcwnquk6h",
        "location": 1,
        "pub_date": "2021-04-20T02:11:56.017799",
        "title": "Title",
        "type": 1
      },
      {
        "author_id": 1,
        "description": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed",
        "event_date": "2021-04-16T02:12",
        "id": 4,
        "img_name": "ypbzunzclqoqautpzrmp",
        "location": 1,
        "pub_date": "2021-04-20T02:13:27.453438",
        "title": "Lorem Ipsum",
        "type": 2
      },
    ];

    announcementService = TestBed.inject(AnnouncementService) as jasmine.SpyObj<AnnouncementService>;
    announcementService.getAnnouncementsByAuthorId.and.returnValue(of(mockedAnnouncementList));
    fixture = TestBed.createComponent(MyAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should announcement list should not be empty', () => {
    expect(component.announcements.length).toBeGreaterThan(0);
  });
});
