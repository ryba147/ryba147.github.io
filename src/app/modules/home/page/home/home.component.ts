import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private user: User = JSON.parse(localStorage.getItem('currentUser'));

  constructor() {
  }

  ngOnInit(): void {
  }
}
