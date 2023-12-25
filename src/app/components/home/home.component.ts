import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course } from '../courses/course/course.model';
import { CourseService } from '../../services/course.service';
import * as constants from '../../shared/constants/home_constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  courses: Course[] = [];

  constants = constants.default;
  subscription: Subscription[] = [];
  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    this.fetchCourses(1, 4);
    this.subscription.push(
      this.courseService.coursesList.subscribe((courses: Course[]) => {
        this.courses = courses.slice();
      })
    );
  }

  fetchCourses(page: number, size: number): void {
    this.subscription.push(
      this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
        this.courses = courses;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }
}
