import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const basicAuthHeader = JSON.parse(localStorage.getItem('authHeader'));

    if (basicAuthHeader) {
      req = req.clone({
        setHeaders: {
          Authorization: `Basic ${basicAuthHeader.toString()}`,
        }
      });
    }
    return next.handle(req);
  }
}
