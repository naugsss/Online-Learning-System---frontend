import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { Course } from '../components/courses/course/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  constructor(public http: HttpClient, private toast: NgToastService) {}

  fetchCourses(page: number = 1, size: number = 6) {
    const url = `http://127.0.0.1:8000/courses?page=${page}&size=${size}`;
    return this.http.get<Course[]>(url).pipe(
      tap((response) => {
        console.log(response);
      })
    );
  }

  fetchPurchasedCoures() {
    return this.http
      .get<Course[]>('http://127.0.0.1:8000/purchased_courses')
      .pipe(
        tap((response) => {
          console.log(response);
        })
      );
  }

  fetchPendingCourseReqeust() {
    return this.http
      .get<Course[]>('http://127.0.0.1:8000/pending_courses')
      .pipe(
        tap((response) => {
          // console.log(response);
        })
      );
  }

  fetchMentorEarning() {
    return this.http.get('http://127.0.0.1:8000/mentor').pipe(
      tap((response) => {
        // console.log(response);
      })
    );
  }

  approveCourse(course: Course, approval_status: string) {
    return this.http
      .put('http://127.0.0.1:8000/courses', {
        course_name: course.name,
        approval_status: approval_status,
      })
      .subscribe({
        next: (response) => {
          console.log(response);

          if (response['message'] === 'Course approved successfully') {
            this.toast.info({
              detail: 'Course approved successfully',
              summary: 'Now course is available for purchase',
            });
          } else if (response['message'] === 'Course rejected') {
            this.toast.info({
              detail: 'Course rejected successfully',
            });
          }
        },
      });
  }

  addMentor(mentorName: string) {
    this.http
      .post('http://127.0.0.1:8000/courses/', {
        username: mentorName,
      })
      .subscribe({
        next: (response) => {
          if (response['message'] === 'No such username exists.') {
            this.toast.warning({
              detail: 'No such user exists.',
              summary: 'Visit my learning section to access the course',
            });
          } else {
            this.toast.success({
              detail: response['message'],
              summary: 'Visit my learning section to access the course',
            });
          }
        },
      });
  }

  addCourse(courseData: any) {
    this.http
      .post('http://127.0.0.1:8000/courses/', {
        name: courseData.name,
        content: courseData.video,
        price: courseData.price,
        duration: courseData.duration,
      })
      .subscribe({
        next: (response) => {
          if (
            response['message'] === 'Course approval request sent to admin.'
          ) {
            this.toast.info({
              detail: 'Course approval request sent to admin.',
              summary: 'Please wait for the admin to approve the course',
            });
          } else if (
            (response['message'] =
              'Another course with the same name already exists. Please try again.')
          ) {
            this.toast.warning({
              detail: 'Another course with the same name already exists.',
              summary: 'Please add a course with different name',
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 403) {
            this.toast.error({
              detail: 'You are not allowed to add a course',
              summary: 'Please ask mentor to do this.',
            });
          }
        },
      });
  }

  purchaseCourse(course: Course) {
    this.http
      .post('http://127.0.0.1:8000/courses/' + course.name, {}, {})
      .subscribe({
        next: (response) => {
          console.log(response['message']);
          if (response['message'] === "You've already purchased this course.") {
            this.toast.info({
              detail: 'Course already purchased',
              summary: 'Visit my learning section to access the course',
            });
          } else {
            this.toast.success({
              detail: response['message'],
              summary: 'Visit my learning section to access the course',
            });
          }
        },
        error: (error) => {
          console.log(error);
          this.toast.error({
            detail: 'There was an error in purchasing the course.',
            summary: 'Please try again',
          });
        },
      });
  }

  // add new course
}
