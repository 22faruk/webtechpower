import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  router=inject(Router)

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("SessionID");
    console.log(idToken)
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${idToken}`)
      });

      return next.handle(cloned);
    }
    else {
      this.router.navigate(['/'])
      return next.handle(req);
    }
  }
}
