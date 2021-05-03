import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileModule } from '@modules/user-profile/user-profile.module';
import { SharedModule } from '@shared/shared.module';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { HeadingComponent } from './layouts/heading/heading.component';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent, HeadingComponent],
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
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
