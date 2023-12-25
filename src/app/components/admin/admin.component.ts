import { Component } from '@angular/core';

import * as constants from '../../shared/constants/admin.constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constants = constants.default;
  changeComponent: boolean = true;

  courseButtonClicked(): void {
    this.changeComponent = true;
  }

  mentorButtonClicked(): void {
    this.changeComponent = false;
  }
}
