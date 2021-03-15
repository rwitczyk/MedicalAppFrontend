import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PatientService} from '../../services/patient.service';
import {CreatePatientModel} from '../../models/CreatePatientModel';
import {Router} from '@angular/router';
import {RecaptchaService} from '../../services/recaptcha.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  registerForm: any;
  patientModel: CreatePatientModel;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private router: Router,
              private recaptchaService: RecaptchaService, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required,
        Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
      // recaptcha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  get f() {
    return this.registerForm.controls;
  }

  sendForm(): void {
    if (this.registerForm.invalid) {
      (Object as any).values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastr.error('Niepoprawny form');
      return;
    }

    this.patientModel = new CreatePatientModel();
    this.patientModel.firstName = this.registerForm.controls.firstName.value;
    this.patientModel.lastName = this.registerForm.controls.lastName.value;
    this.patientModel.email = this.registerForm.controls.email.value;
    this.patientModel.password = this.registerForm.controls.password.value;
    this.patientModel.phoneNumber = this.registerForm.controls.phoneNumber.value;
    console.log(this.patientModel);

    this.patientService.createPatientAccount(this.patientModel).subscribe(() => {
      this.toastr.success('Konto zostało utworzone!');
      this.router.navigate(['/home']);
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }

  // resolved(captchaResponse: string): void {
  //   console.log(`Resolved response token: ${captchaResponse}`);
  //   this.recaptchaService.sendToken(captchaResponse).subscribe(value => {
  //     console.log('CORRECT - ' + value);
  //   }, error => {
  //     console.log('ERROR - ' + error.error);
  //   });
  // }
}
