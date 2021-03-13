import {Component, OnInit} from '@angular/core';
import {DoctorService} from '../../../services/doctor.service';
import {DoctorModel} from '../../../models/DoctorModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {GetAvailableVisitsModel} from '../../../models/GetAvailableVisitsModel';
// @ts-ignore
import {VisitsListModel} from '../../../models/VisitsListModel';
import {ReserveVisitModel} from '../../../models/ReserveVisitModel';
import jwtDecode from 'jwt-decode';
import {PatientService} from '../../../services/patient.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reserve-visit',
  templateUrl: './reserve-visit.component.html',
  styleUrls: ['./reserve-visit.component.scss']
})
export class ReserveVisitComponent implements OnInit {
  doctorsList: DoctorModel[];
  reserveVisit: FormGroup;
  getAvailableVisitsModel = new GetAvailableVisitsModel();
  availableVisitsList: VisitsListModel[];
  reserveVisitModel = new ReserveVisitModel();

  constructor(private doctorService: DoctorService, private formBuilder: FormBuilder, private toastr: ToastrService,
              private patientService: PatientService, private router: Router) {
    this.reserveVisit = this.formBuilder.group({
      selectedDoctorId: ['', Validators.required],
      visitId: ['', Validators.required],
      visitDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(value => {
      this.doctorsList = value;
    });
  }

  sendForm(): void {
    if (this.reserveVisit.invalid) {
      (Object as any).values(this.reserveVisit.controls).forEach(control => {
        control.markAsTouched();
      });
      this.toastr.error('Niepoprawny form');
      return;
    }

    // @ts-ignore
    console.log(jwtDecode(sessionStorage.getItem('token')).user_id);
    // @ts-ignore
    this.reserveVisitModel.patientAccountId = jwtDecode(sessionStorage.getItem('token')).user_id;
    this.reserveVisitModel.doctorId = this.reserveVisit.controls.selectedDoctorId.value;
    this.reserveVisitModel.visitDate = this.reserveVisit.controls.visitDate.value;
    this.reserveVisitModel.visitId = this.reserveVisit.controls.visitId.value;
    this.patientService.reserveVisit(this.reserveVisitModel).subscribe(() => {
      this.toastr.success('Wizyta zostala zarezerwowana!');
      this.router.navigate(['/allPatientVisits']);
    });
  }

  getAvailableVisits(): void {
    this.getAvailableVisitsModel.doctorId = this.reserveVisit.controls.selectedDoctorId.value;
    this.getAvailableVisitsModel.date = this.reserveVisit.controls.visitDate.value;
    this.patientService.getAvailableVisits(this.getAvailableVisitsModel).subscribe(value => {
      this.availableVisitsList = value;
      console.log(this.availableVisitsList);
    });
  }
}
