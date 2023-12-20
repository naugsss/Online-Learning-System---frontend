import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course } from '../courses/course/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription;
  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    console.log('calling functions');
    this.fetchCourses(1, 4);
    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]) => {
        console.log(courses);
        this.courses = courses.slice();
      }
    );
  }

  fetchCourses(page: number, size: number) {
    this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
      this.courses = courses;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
