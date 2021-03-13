import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RecaptchaService} from '../../../services/recaptcha.service';
import {ToastrService} from 'ngx-toastr';
import {CreateDoctorModel} from '../../../models/CreateDoctorModel';
import {DoctorService} from '../../../services/doctor.service';

@Component({
  selector: 'app-create-doctor-account',
  templateUrl: './create-doctor-account.component.html',
  styleUrls: ['./create-doctor-account.component.scss']
})
export class CreateDoctorAccountComponent implements OnInit {
  registerForm: any;
  doctorModel = new CreateDoctorModel();

  constructor(private formBuilder: FormBuilder, private doctorService: DoctorService, private router: Router,
              private recaptchaService: RecaptchaService, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required,
        Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
      specialization: ['', [Validators.required]],
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

    this.doctorModel.firstName = this.registerForm.controls.firstName.value;
    this.doctorModel.lastName = this.registerForm.controls.lastName.value;
    this.doctorModel.email = this.registerForm.controls.email.value;
    this.doctorModel.password = this.registerForm.controls.password.value;
    this.doctorModel.phoneNumber = this.registerForm.controls.phoneNumber.value;
    this.doctorModel.specialization = this.registerForm.controls.specialization.value;
    console.log(this.doctorModel);

    this.doctorService.createDoctorAccount(this.doctorModel).subscribe(() => {
      this.toastr.success('Konto doktora zostało utworzone!');
      this.router.navigate(['/home']);
    }, error1 => {
      console.log('BLAD' + error1.error);
    });
  }

}
