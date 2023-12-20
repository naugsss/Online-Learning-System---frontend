import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent {
  mentorEarnings: any = [];
  changeComponent: boolean = true;

  constructor(private courseDataService: CourseDataService) {}
  subscription: Subscription;

  ngOnInit(): void {
    this.courseDataService.fetchMentorEarning().subscribe((earning) => {
      console.log(earning);
      this.mentorEarnings = earning;
    });

    this.subscription = this.courseDataService.updateEarnings.subscribe(() => {
      this.courseDataService.fetchMentorEarning().subscribe((earning) => {
        this.mentorEarnings = earning;
      });
    });
  }

  addCourseButtonClicked() {
    this.changeComponent = true;
  }

  addFaqButtonClicked() {
    this.changeComponent = false;
  }
}
