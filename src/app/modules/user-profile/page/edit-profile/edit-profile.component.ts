import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@core/services/user.service';
import { Constants } from '@shared/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  currentUser: User;
  updForm: FormGroup;
  loading = false;
  fileFormMsg = 'Choose an image';
  readonly CLOUDINARY_URL = Constants.CLOUDINARY_URL;

  constructor(private userService: UserService,
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder) {
    this.buildForm();
  }

  get f() {
    return this.updForm.controls;
  }

  buildForm(): void {
    this.updForm = this.fb.group({
      firstname: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      lastname: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      file: [null],
      email: ['', [Validators.pattern(Constants.EMAIL_REGEX), Validators.minLength(5), Validators.maxLength(40)]],
      location: [''],
      password: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatcher });
  }

  onFileChange($event): void {
    if ($event.target.files && $event.target.files.length) {
      const uploadedFile = $event.target.files[0];
      this.fileFormMsg = uploadedFile.name;

      this.updForm.patchValue({
        file: uploadedFile
      });
    }
  }

  passwordMatcher(formGroup: FormGroup): boolean | { noMatch: boolean } {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password == confirmPassword ? null : { noMatch: true };
  }

  updateUserInfo(): void {
    this.loading = true;
    this.userService.updateUser(this.currentUser.id, this.dataService.toFormData(this.updForm.value))
      .subscribe(
        (response) => {
          alert('User info was updated');
          this.loading = false;
          this.userService.setUser(response);
          window.location.reload();
        },
        (error: HttpErrorResponse) => console.log(error)
      );
  }

  deleteAccount(): void {
    this.userService.deleteUser(this.currentUser.id).subscribe(response => {
      localStorage.clear();
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
  }
}
