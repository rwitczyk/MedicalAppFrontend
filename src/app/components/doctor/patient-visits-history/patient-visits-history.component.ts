import {Component, OnInit} from '@angular/core';
import {VisitsListModel} from '../../../models/VisitsListModel';
import {AcceptVisitModel} from '../../../models/AcceptVisitModel';
import {PatientService} from '../../../services/patient.service';
import {ToastrService} from 'ngx-toastr';
import {DoctorService} from '../../../services/doctor.service';
import jwtDecode from 'jwt-decode';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-patient-visits-history',
  templateUrl: './patient-visits-history.component.html',
  styleUrls: ['./patient-visits-history.component.scss']
})
export class PatientVisitsHistoryComponent implements OnInit {

  allDoctorVisits: VisitsListModel[];
  headElements = ['Data', 'Od', 'Do', 'Status wizyty', 'Pacjent', 'Opis', 'Cena'];
  constructor(private patientService: PatientService, private toastr: ToastrService,
              private doctorService: DoctorService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    // const patientId = this.router.snapshot.paramMap.get('patientId');
    // @ts-ignore
    // @ts-ignore
    this.doctorService.getAllDoctorVisitsByPatient(jwtDecode(sessionStorage.getItem('token')).user_id, parseInt(this.router.snapshot.paramMap.get('patientId'), 10)).subscribe(value => {
      this.allDoctorVisits = value;
    });
  }
}
