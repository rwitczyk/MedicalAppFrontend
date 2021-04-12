import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { DoctorModel } from '../../../models/DoctorModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetAvailableVisitsModel } from '../../../models/GetAvailableVisitsModel';
// @ts-ignore
import { TestModelResult } from '../../../models/TestModelResult';
import { PatientModel } from '../../../models/PatientModel';
import jwtDecode from 'jwt-decode';
import { PatientService } from '../../../services/patient.service';
import { LabolatoryTestService } from '../../../services/labolatory-test.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-test-result',
  templateUrl: './enter-test-result.component.html',
  styleUrls: ['./enter-test-result.component.scss']
})
export class EnterTestResultComponent implements OnInit {


  testResult:TestModelResult = new TestModelResult;
  antygenTest: boolean;
  patientsList: PatientModel[];
  enterTestResult: FormGroup;

  constructor(private doctorService: DoctorService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private patientService: PatientService, private router: Router, private labolatoryTestService:LabolatoryTestService) {
    this.enterTestResult = this.formBuilder.group({
      selectedPatientId: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      selectedPcR: ['', Validators.required],
      selectedAntygen: ['', Validators.required],
      selectedSero: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(value => {
      this.patientsList = value;
      console.log(value);
    });
  }

  sendForm() { 
    this.testResult.patientId = this.enterTestResult.controls.selectedPatientId.value;
    // @ts-ignore
    this.testResult.nurseId =  parseInt(jwtDecode(sessionStorage.getItem('token')).user_id);
    this.testResult.subject = this.enterTestResult.controls.subject.value;
    this.testResult.description = this.enterTestResult.controls.description.value;
    this.testResult.pcr = this.enterTestResult.controls.selectedPcR.value;
    this.testResult.antygen = this.enterTestResult.controls.selectedAntygen.value;
    this.testResult.sero = this.enterTestResult.controls.selectedSero.value;

    console.log( this.testResult)
    this.labolatoryTestService.addTestResult( this.testResult).subscribe(() => {
      this.toastr.success('Wyniki badań zostały zapisane!'); 
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }
  onItemChange(value) {
    console.log(" Value is : ", value);
  }
}
