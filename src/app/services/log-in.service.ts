import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogInModel} from '../models/LogInModel';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private http: HttpClient) {
  }

  logIn(logInModel: LogInModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/login', logInModel);
  }
}
