import { Component, OnInit } from '@angular/core';

import { CourseDataService } from 'src/app/shared/courseData.service';
import * as constants from '../../../shared/constants/admin.constants';

@Component({
  selector: 'app-admin-mentor',
  templateUrl: './admin-mentor.component.html',
  styleUrls: ['./admin-mentor.component.css'],
})
export class AdminMentorComponent implements OnInit {
  mentorEarnings: any = [];
  constants = constants.default;
  mentorName: string = '';

  constructor(private CourseDataService: CourseDataService) {}

  ngOnInit(): void {
    this.CourseDataService.fetchMentorEarning().subscribe((earning) => {
      this.mentorEarnings = earning;
    });
  }

  onButtonClicked() {
    this.CourseDataService.addMentor(this.mentorName);
  }
}
