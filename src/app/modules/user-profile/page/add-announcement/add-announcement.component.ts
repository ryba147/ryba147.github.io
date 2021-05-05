import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '@shared/constants';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AnnouncementService } from '@core/services/announcement.service';
import { User } from '@app/models/user';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {

  annoForm: FormGroup;
  loading = false;
  annoType = 1;
  fileFormMsg = 'Choose an image';
  currentUser: User;
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private announcementService: AnnouncementService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder) {
    this.buildForm();
  }

  get f() {
    return this.annoForm.controls;
  }

  buildForm(): void {
    this.annoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      event_date: [''],
      location: [''],
      author_id: [null],
      type: [this.annoType, [Validators.required]],
      file: [null],
    });
  }

  onFileChange($event): void {
    if ($event.target.files && $event.target.files.length) {
      const uploadedFile = $event.target.files[0];
      this.fileFormMsg = uploadedFile.name;

      this.annoForm.patchValue({
        file: uploadedFile
      });
    }
  }

  changeAnnouncementType($event): void {
    this.annoType = $event.target.value;
    this.annoForm.controls.type.setValue(this.annoType);
  }

  addAnnouncement(): void {
    this.loading = true;
    this.annoForm.patchValue({
      author_id: this.currentUser.id
    });
    console.log(this.annoForm.value);
    this.announcementService.createAnnouncement(this.toFormData(this.annoForm.value))
      .subscribe(
        (response) => {
          console.log(response);
          alert('Announcement was created');
          this.loading = false;
          window.location.reload();
        },
        (error: HttpErrorResponse) => console.log(error)
      );
  }

  toFormData<T>(formValue: T): FormData{
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }
}
