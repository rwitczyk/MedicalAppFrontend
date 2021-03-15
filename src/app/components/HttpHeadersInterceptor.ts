import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  token: string;

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = sessionStorage.getItem('token');

    // console.log('TOKEN ' + this.token);

    if (this.token != null) {
      request = request.clone({
        setHeaders: {
          ContentType: 'application/json',
          Authorization: 'Bearer ' + this.token,
          AccessControlAllowMethods: 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Origin': '*',
          AccessControlAllowHeaders: 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
          AccessControlAllowCredentials: 'true'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          ContentType: 'application/json',
          AccessControlAllowMethods: 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Origin': '*',
          AccessControlAllowHeaders: 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
          AccessControlAllowCredentials: 'true'
        }
      });
    }
    return next.handle(request);
  }
}
