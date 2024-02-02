import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let headers = req.headers.set('Content-Type', 'application/json');
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      headers = headers.set('Accept', 'text/plain');
    }

    const request = req.clone({ headers: headers });
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.authService.logout();
      }

      return throwError(error);
    }))
  }

}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];
