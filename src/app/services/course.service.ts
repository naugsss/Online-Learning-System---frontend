import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Course } from '../components/courses/course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  coursesList = new Subject<Course[]>();
  private selectedCourse: Course;

  allCourses: Course[] = [];
  private pendingCourses: Course[] = [];
  private purchasedCourses: Course[] = [];

  constructor(private courseDataService: CourseDataService) {}

  fetchCourses(page: number, size: number): void {
    this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
      this.allCourses = courses;
      this.coursesList.next(this.allCourses.slice());
    });
  }

  setAllCourses(course: Course[]): void {
    if (!this.allCourses.length) {
      this.allCourses = course;
    }
    this.coursesList.next(this.allCourses.slice());
  }

  getAllCourses(): Course[] {
    return this.allCourses.slice();
  }

  setSelectedCourse(course: Course): void {
    this.selectedCourse = course;
  }

  getSelectedCourse(): Course | null {
    return this.selectedCourse;
  }

  setPendingCourses(course: Course[]): void {
    this.pendingCourses = course;
    this.coursesList.next(this.pendingCourses.slice());
  }

  getPendingCourses(): Course[] {
    return this.pendingCourses.slice();
  }

  setPurchasedCourses(course: Course[]): void {
    this.purchasedCourses = course;
    this.coursesList.next(this.purchasedCourses.slice());
  }

  getPurchasedCourses(): Course[] {
    return this.purchasedCourses.slice();
  }
}
