import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {ToastrService} from 'ngx-toastr';
import jwtDecode from 'jwt-decode';
import {DoctorService} from '../../../services/doctor.service';
import {VisitsListModel} from '../../../models/VisitsListModel';
import {AcceptVisitModel} from '../../../models/AcceptVisitModel';

@Component({
  selector: 'app-all-doctor-visits',
  templateUrl: './all-doctor-visits.component.html',
  styleUrls: ['./all-doctor-visits.component.scss']
})
export class AllDoctorVisitsComponent implements OnInit {

  allDoctorVisits: VisitsListModel[];
  headElements = ['Data', 'Od', 'Do', 'Status wizyty', 'Opis', 'Pacjent', 'Cena', 'Anulowanie', 'Akceptacja'];
  selectedVisitId: number;
  acceptVisitModel = new AcceptVisitModel();

  constructor(private patientService: PatientService, private toastr: ToastrService, private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.doctorService.getAllDoctorVisits(jwtDecode(sessionStorage.getItem('token')).user_id).subscribe(value => {
      this.allDoctorVisits = value;
    });
  }

  cancelVisit(id: number): void {
    this.patientService.cancelVisit(id).subscribe(() => {
      this.toastr.success('Wizyta zostala anulowana');
      this.ngOnInit();
    });
  }

  acceptVisit(description: string, price: string): void {
    this.acceptVisitModel.visitId = this.selectedVisitId;
    this.acceptVisitModel.description = description;
    this.acceptVisitModel.price = price;

    this.doctorService.acceptVisit(this.acceptVisitModel).subscribe(() => {
      this.toastr.success('Wizyta zostala potwierdzona');
      this.ngOnInit();
    });
  }

  saveSelectedVisit(id: number): void {
    this.selectedVisitId = id;
  }
}
