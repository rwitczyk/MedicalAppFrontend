import { Component, Input } from '@angular/core';
import {AdComponent} from '../ad.component';



@Component({
  template: `
    <div class="job-ad">
      <img class="images" src="{{data.url}}" width="70%"/>
    </div>
  `
})
export class DentistAdComponent implements AdComponent {
  @Input() data: any;

}
