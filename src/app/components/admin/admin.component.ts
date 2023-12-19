import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  changeComponent: boolean = true;

  ngOnInit(): void {}

  courseButtonClicked() {
    this.changeComponent = true;
  }

  mentorButtonClicked() {
    this.changeComponent = false;
  }
}
