import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import * as constants from '../../../assets/constants/mentor.constants';
@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent {
  mentorEarnings: any = [];
  constants = constants.default;
  changeComponent: boolean = true;

  constructor(private courseDataService: CourseDataService) {}
  subscription: Subscription[] = [];

  ngOnInit(): void {
    this.subscription.push(
      this.courseDataService.fetchMentorEarning().subscribe((earning) => {
        this.mentorEarnings = earning;
      })
    );

    this.subscription.push(
      this.courseDataService.updateEarnings.subscribe(() => {
        this.courseDataService.fetchMentorEarning().subscribe((earning) => {
          this.mentorEarnings = earning;
        });
      })
    );
  }

  addCourseButtonClicked() {
    this.changeComponent = true;
  }

  addFaqButtonClicked() {
    this.changeComponent = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
