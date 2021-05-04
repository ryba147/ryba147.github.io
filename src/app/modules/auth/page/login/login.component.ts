import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from "@core/services/auth.service";
import { Router } from "@angular/router";
import {UserService} from "@core/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    this.authService.authUser(new URLSearchParams(this.loginForm.value).toString())
      .subscribe((response) => {
          this.userService.setUser(response);
          this.router.navigate(['home']);
        },
        (error: HttpErrorResponse) => {
          alert(error);
        }
      );
  }

  ngOnInit(): void {}
}
