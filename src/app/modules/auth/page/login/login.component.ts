import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, ) {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // login(): void {
  //   this.authService
  //     .authUser(new URLSearchParams(this.loginForm.value).toString())
  //     .subscribe(
  //       (response) => {
  //         // this.authService.setUser(JSON.stringify(response.userData));
  //         this.authService.setUser(response.userData);
  //         console.log(1111, this.authService.userSubject);
  //         console.log("loginComponent| this.u !== null: ", this.authService.userSubject !== null);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log(error);
  //       }
  //     );
  // }

  ngOnInit(): void {}
}
