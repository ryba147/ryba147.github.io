import { TestBed } from '@angular/core/testing';

import { AnnouncementService } from './announcement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnnouncementService', () => {
  let service: AnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnnouncementService],
    });
    service = TestBed.inject(AnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
