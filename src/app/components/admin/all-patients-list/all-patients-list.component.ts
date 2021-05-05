import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {PatientModel} from '../../../models/PatientModel';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../services/account.service';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.scss']
})
export class AllPatientsListComponent implements OnInit {
  headElements = ['id', 'imie', 'nazwisko', 'email', 'aktywne', 'akcja'];
  patientsList: PatientModel[];
  role;

  constructor(private patientService: PatientService, private toastr: ToastrService,
              private accountService: AccountService, private router: Router) {
    // @ts-ignore
    this.role = jwtDecode(sessionStorage.getItem('token')).role;
    if (this.role === 'ROLE_DOCTOR') {
      this.headElements = ['imie', 'nazwisko', 'email', 'aktywne', 'akcja'];
    }
  }


  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(value => {
      this.patientsList = value;
    });
  }

  enableAccount(id: number): void {
    this.accountService.activatePatientAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo aktywowane!');
      this.ngOnInit();
    });
  }

  disableAccount(id: number): void {
    this.accountService.disablePatientAccount(id).subscribe(() => {
      this.toastr.success('Konto zostalo dezaktywowane!');
      this.ngOnInit();
    });
  }

  goToPatientHistory(patientId: number): void {
    this.router.navigate(['patientVisitsHistory/' + patientId]);
  }
}
