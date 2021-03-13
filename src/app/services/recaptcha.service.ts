import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  constructor(private http: HttpClient) {
  }

  sendToken(token: string): Observable<any> {
    return this.http.post(environment.backendUrl + '/validateToken', {recaptcha: token});
  }
}
