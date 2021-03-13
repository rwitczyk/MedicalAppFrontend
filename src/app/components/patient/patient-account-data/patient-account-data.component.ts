import {Component, OnInit} from '@angular/core';
import {CreatePatientModel} from '../../../models/CreatePatientModel';
import {FormBuilder, Validators} from '@angular/forms';
import {PatientService} from '../../../services/patient.service';
import {Router} from '@angular/router';
import {RecaptchaService} from '../../../services/recaptcha.service';
import {ToastrService} from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import {PatientModel} from '../../../models/PatientModel';
import {UserLoginDataModel} from '../../../models/UserLoginDataModel';
import {EditPatientDataModel} from '../../../models/EditPatientDataModel';

@Component({
  selector: 'app-my-account-data',
  templateUrl: './patient-account-data.component.html',
  styleUrls: ['./patient-account-data.component.scss']
})
export class PatientAccountDataComponent implements OnInit {

  accountData: any;
  patientModel = new PatientModel();
  editPatientDataModel = new EditPatientDataModel();

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private router: Router,
              private toastr: ToastrService) {
    this.patientModel.userLoginDataEntity = new UserLoginDataModel();
    this.accountData = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
    });
  }

  ngOnInit(): void {
    console.log(jwtDecode(sessionStorage.getItem('token')));
    // @ts-ignore
    this.patientService.getPatientById(jwtDecode(sessionStorage.getItem('token')).user_id).subscribe(value => {
      this.patientModel = value;
    });
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.accountData.controls;
  }

  sendForm(): void {
    if (this.accountData.invalid) {
      (Object as any).values(this.accountData.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastr.error('Niepoprawny form');
      return;
    }

    this.editPatientDataModel.patientId = this.patientModel.id;
    this.editPatientDataModel.firstName = this.accountData.controls.firstName.value;
    this.editPatientDataModel.lastName = this.accountData.controls.lastName.value;
    this.editPatientDataModel.password = this.accountData.controls.password.value;
    this.editPatientDataModel.phoneNumber = this.accountData.controls.phoneNumber.value;
    console.log(this.editPatientDataModel);

    this.patientService.editPatientAccountData(this.editPatientDataModel).subscribe(() => {
      this.toastr.success('Dane zostaly zmienione!');
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }

}
