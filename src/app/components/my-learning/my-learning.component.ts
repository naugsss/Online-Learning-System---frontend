import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../courses/course/course.model';
import * as constants from '../../shared/constants/my_learning.constants';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css'],
})
export class MyLearningComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription[] = [];
  constants = constants.default;
  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseDataService.fetchPurchasedCoures().subscribe((courses) => {
      this.courseService.setPurchasedCourses(courses);
    });

    this.subscription.push(
      this.courseService.coursesList.subscribe((courses: Course[]): void => {
        this.courses = courses;
      })
    );

    this.courses = this.courseService.getPurchasedCourses();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
