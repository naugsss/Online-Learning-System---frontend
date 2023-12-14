import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../courses/course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { CourseService } from '../../courses/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css'],
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription;
  allCourses: Course[] = [];
  courseButton: boolean = true;

  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseDataService.fetchPendingCourseReqeust().subscribe((courses) => {
      this.courseService.setPendingCourses(courses);
    });

    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]): void => {
        this.courses = courses;
        this.allCourses = this.courseService.getAllCourses();
      }
    );
  }

  approveCourse(course: Course) {
    console.log(course);
    this.courseDataService.approveCourse(course, 'approve');
  }
  rejectCourse(course: Course) {
    console.log(course);
    this.courseDataService.approveCourse(course, 'reject');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
