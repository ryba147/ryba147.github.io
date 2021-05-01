import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileModule } from '@modules/user-profile/user-profile.module';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@core/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  imports: [
    // angular
    BrowserModule,

    // app
    AppRoutingModule,
    HttpClientModule,

    // core & shared
    SharedModule,

    // 3rd party
    UserProfileModule,
    AuthModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
