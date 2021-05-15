import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LabolatoryTestService} from '../../services/labolatory-test.service';
import {AvailableVisitsForCovidTestModel} from '../../models/AvailableVisitsForCovidTestModel';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RegisterForACovidTestModel} from '../../models/RegisterForACovidTestModel';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-covid-test-registration',
  templateUrl: './covid-test-registration.component.html',
  styleUrls: ['./covid-test-registration.component.scss']
})
export class CovidTestRegistrationComponent implements OnInit {
  covidTestRegistrationForm: FormGroup;
  availableVisitsList: AvailableVisitsForCovidTestModel[];
  registerForACovidTestModel: RegisterForACovidTestModel;
  price: number;

  constructor(private formBuilder: FormBuilder, private labolatoryTestService: LabolatoryTestService, private toastr: ToastrService,
              private router: Router) {
    this.covidTestRegistrationForm = this.formBuilder.group({
      visitDate: [''],
      visitType: [''],
      visitId: ['', Validators.required],
      pcr: [false],
      antygen: [false],
      sero: [false],
      refunded: [false],
    });
    this.price = 0;
  }

  ngOnInit(): void {
  }

  getAvailableVisits(): void {
    this.labolatoryTestService.getAvailableVisits(this.covidTestRegistrationForm.controls.visitDate.value).subscribe(value => {
      this.availableVisitsList = value;
    });
  }

  reserveVisit(): void {
    this.registerForACovidTestModel = new RegisterForACovidTestModel();
    // @ts-ignore
    this.registerForACovidTestModel.accountId = jwtDecode(sessionStorage.getItem('token')).user_id;
    this.registerForACovidTestModel.visitId = this.covidTestRegistrationForm.controls.visitId.value;
    this.registerForACovidTestModel.visitType = this.covidTestRegistrationForm.controls.visitType.value;
    this.registerForACovidTestModel.pcrTest = this.covidTestRegistrationForm.controls.pcr.value;
    this.registerForACovidTestModel.antygenTest = this.covidTestRegistrationForm.controls.antygen.value;
    this.registerForACovidTestModel.seroTest = this.covidTestRegistrationForm.controls.sero.value;
    this.registerForACovidTestModel.price = this.price;

    this.labolatoryTestService.registerForACovidTest(this.registerForACovidTestModel).subscribe(() => {
      this.toastr.success('Zapisales sie badanie!');
      this.router.navigate(['/home']);
    }, error => {
      this.toastr.error('Istnieje juz zarezerwowana wizyta covid dla tego konta!');
    });
  }

  updateVisitPrice(): void {
    this.price = 0;
    if (this.covidTestRegistrationForm.controls.refunded.value) {
      return;
    }

    if (this.covidTestRegistrationForm.controls.pcr.value) {
      this.price += 50;
    }
    if (this.covidTestRegistrationForm.controls.antygen.value) {
      this.price += 50;
    }
    if (this.covidTestRegistrationForm.controls.sero.value) {
      this.price += 50;
    }
  }

  reloadSection(): void {
    if (this.covidTestRegistrationForm.controls.visitType.value === 'covidTest') {
      document.getElementById('onlyForCovid').style.display = 'block';
    } else {
      document.getElementById('onlyForCovid').style.display = 'none';
    }
  }
}
