import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Course } from './course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  coursesList = new Subject<Course[]>();
  private selectedCourse: Course;
  constructor(private courseDataService: CourseDataService) {}

  allCourses: Course[] = [];
  private pendingCourses: Course[] = [];
  private purchasedCourses: Course[] = [];

  fetchCourses(page: number, size: number) {
    this.courseDataService.fetchCourses(page, size).subscribe((courses) => {
      this.allCourses = courses;
      this.coursesList.next(this.allCourses.slice());
    });
  }

  setAllCourses(course: Course[]) {
    if (!this.allCourses.length) {
      this.allCourses = course;
    }
    this.coursesList.next(this.allCourses.slice());
  }

  getAllCourses() {
    return this.allCourses.slice();
  }

  setSelectedCourse(course: Course): void {
    this.selectedCourse = course;
  }

  getSelectedCourse(): Course | null {
    return this.selectedCourse;
  }

  setPendingCourses(course: Course[]) {
    this.pendingCourses = course;
    this.coursesList.next(this.pendingCourses.slice());
  }
  getPendingCourses() {
    return this.pendingCourses.slice();
  }

  setPurchasedCourses(course: Course[]) {
    this.purchasedCourses = course;
    this.coursesList.next(this.purchasedCourses.slice());
  }
  getPurchasedCourses() {
    return this.purchasedCourses.slice();
  }
}
