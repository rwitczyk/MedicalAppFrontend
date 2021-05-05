import {Component, OnInit} from '@angular/core';
import {VisitsListModel} from '../../../models/VisitsListModel';
import {PatientService} from '../../../services/patient.service';
import jwtDecode from 'jwt-decode';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-patient-visits',
  templateUrl: './all-patient-visits.component.html',
  styleUrls: ['./all-patient-visits.component.scss']
})
export class AllPatientVisitsComponent implements OnInit {
  allPatientVisits: VisitsListModel[];
  headElements = ['Data', 'Od', 'Do', 'Status wizyty', 'Lekarz', 'Opis', 'Akcja'];

  constructor(private patientService: PatientService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.patientService.getAllPatientVisits(jwtDecode(sessionStorage.getItem('token')).user_id).subscribe(value => {
      this.allPatientVisits = value;
    });
  }

  cancelVisit(id: number): void {
    this.patientService.cancelVisit(id).subscribe(() => {
      this.toastr.success('Wizyta zostala anulowana');
      this.ngOnInit();
    });
  }

  downloadPdf(id: number): void {
    this.patientService.downloadPdf(id).subscribe(data => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'rachunek.pdf';
      link.click();
    });
  }
}
