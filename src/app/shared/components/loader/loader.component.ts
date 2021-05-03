import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';
import { Loader } from "@app/models/loader";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show = false;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: Loader) => {this.show = state.show;});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
