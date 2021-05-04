import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Constants } from '@shared/constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;
  userRole = 'regular';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.buildForm();
  }

  get f() {
    return this.regForm.controls;
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.regForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern(Constants.EMAIL_REGEX), Validators.minLength(5), Validators.maxLength(40)]],
      role: [this.userRole, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatcher });
  }

  changeRole($event): void {
    // console.log($event.target.value);
    this.userRole = $event.target.value;
    this.regForm.controls.role.setValue(this.userRole);
  }

  passwordMatcher(formGroup: FormGroup): boolean | { noMatch: boolean } {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    return password == confirmPassword ? null : { noMatch: true };
  }

  signup(): void {
    if (this.regForm.invalid) {
      return;
    }

    this.userService.createUser(this.regForm.value).subscribe((response) => {
        console.log(response);
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
    );
  }
}
