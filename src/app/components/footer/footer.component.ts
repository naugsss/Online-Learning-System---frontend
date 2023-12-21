import { Component } from '@angular/core';
import * as constants from '../../../assets/constants/home_constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constants = constants.default;
}
