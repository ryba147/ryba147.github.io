import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    this.authService
      .authUser(new URLSearchParams(this.loginForm.value).toString())
      .subscribe(
        (response) => {
          localStorage.setItem('authHeader', response.authHeader);
          localStorage.setItem('currentUser', JSON.stringify(response.userData));
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  ngOnInit(): void {}
}
