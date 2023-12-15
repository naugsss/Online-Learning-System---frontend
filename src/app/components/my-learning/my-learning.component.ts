import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import { CourseService } from '../courses/course.service';
import { Course } from '../courses/course/course.model';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css'],
})
export class MyLearningComponent implements OnInit {
  courses: Course[] = [];
  subscription: Subscription;

  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseDataService.fetchPurchasedCoures().subscribe((courses) => {
      this.courseService.setPurchasedCourses(courses);
    });

    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]): void => {
        this.courses = courses;
      }
    );

    this.courses = this.courseService.getPurchasedCourses();
  }
}
