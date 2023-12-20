import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Course, CourseStatus } from '../../courses/course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css'],
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  subscription: Subscription;
  allCourses: Course[] = [];
  anotherSubscription: Subscription;
  courseButton: boolean = true;
  currentPage: number = 1;
  isLoading: boolean = false;
  isDisable: boolean = false;
  constructor(
    private courseDataService: CourseDataService,
    private courseService: CourseService
  ) {}

  private courseDisabledSubject = new Subject<CourseStatus[]>();

  ngOnInit(): void {
    this.courseDataService.fetchPendingCourseReqeust().subscribe((approved) => {
      this.courseService.setPendingCourses(approved);
    });
    this.courseDataService.fetchCourses().subscribe((courses) => {
      this.allCourses = courses;
    });

    this.courseDisabledSubject.subscribe();

    this.subscription = this.courseService.coursesList.subscribe(
      (courses: Course[]): void => {
        this.courses = courses;
        this.allCourses = this.courseService.getAllCourses();
      }
    );
    this.subscription = this.courseDataService.updateCourseList.subscribe(
      (courses) => {
        this.filterCourse(courses);
      }
    );
    this.subscription = this.courseDataService.disableCourseList.subscribe(
      (course) => {
        this.allCourses = this.courseService.getAllCourses();
      }
    );
    window.addEventListener('scroll', () => {
      if (this.isAtTableBottom()) {
        this.loadMoreCourses();
      }
    });
  }

  filterCourse(courses: Course) {
    this.courses = this.courses.filter(
      (course) => course.name !== courses.name
    );
  }

  approveCourse(course: Course) {
    this.isLoading = true;
    this.courseDataService.approveCourse(course, 'approve');
    this.isLoading = false;
  }

  rejectCourse(course: Course) {
    this.isLoading = true;
    console.log(course);
    this.courseDataService.approveCourse(course, 'reject');
    this.isLoading = false;
  }

  disableCourse(course: Course) {
    this.isDisable = true;
    this.courseDataService.disableCourse(course);

    this.courseDataService.fetchCourses().subscribe((courses) => {
      this.allCourses = courses;
    });
    this.isDisable = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadMoreCourses(): void {
    this.currentPage++;
    this.courseDataService
      .fetchCourses(this.currentPage, 8)
      .subscribe((courses) => {
        this.allCourses = this.allCourses.concat(courses);
      });
  }

  private isAtTableBottom(): boolean {
    const scrollTop = document.documentElement.scrollTop;
    const elementHeight = document.documentElement.clientHeight;
    const totalHeight = document.documentElement.scrollHeight;
    return scrollTop + elementHeight >= totalHeight - 100;
  }
}
