import { Component, OnInit } from '@angular/core';

import * as constants from '../../shared/constants/admin.constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constants = constants.default;
  changeComponent: boolean = true;

  ngOnInit(): void {}

  courseButtonClicked() {
    this.changeComponent = true;
  }

  mentorButtonClicked() {
    this.changeComponent = false;
  }
}
