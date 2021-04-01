import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AddNurseAccountDto} from '../models/AddNurseAccountDto';
import {NurseModel} from '../models/NurseModel';
import {EditNurseDataModel} from '../models/EditNurseDataModel';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  constructor(private http: HttpClient) {
  }

  addNurseAccount(nurse: AddNurseAccountDto): Observable<AddNurseAccountDto> {
    return this.http.post<AddNurseAccountDto>(environment.backendUrl + '/nurse', nurse);
  }

  editNurseAccount(nurseModel: EditNurseDataModel): Observable<void> {
    return this.http.post<void>(environment.backendUrl + '/nurse/edit', nurseModel);
  }

  getAllNurses(): Observable<NurseModel[]> {
    return this.http.get<NurseModel[]>(environment.backendUrl + '/nurse');
  }

  getNurseAccountById(nurseAccountId: string): Observable<NurseModel> {
    return this.http.get<NurseModel>(environment.backendUrl + '/nurse/' + nurseAccountId);
  }
}
