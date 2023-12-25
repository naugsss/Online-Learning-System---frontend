import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import * as constants from '../../shared/constants/mentor.constants';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css'],
})
export class MentorComponent {
  mentorEarnings: any = [];
  constants = constants.default;
  changeComponent: boolean = true;
  subscription: Subscription[] = [];

  constructor(private courseDataService: CourseDataService) {}

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

  addCourseButtonClicked(): void {
    this.changeComponent = true;
  }

  addFaqButtonClicked(): void {
    this.changeComponent = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
