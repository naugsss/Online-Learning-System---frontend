import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import {
  Course,
  CourseFaq,
  CourseFeedback,
  CourseStatus,
} from '../components/courses/course/course.model';
import { Faq } from '../components/mentor/add-faq/add-faq.component';
import * as constants from '../shared/constants/courseData.constants';

interface MentorEarning {
  name: string;
  course_name: string;
  earning: number;
}

@Injectable({
  providedIn: 'root',
})
export class CourseDataService {
  updateCourseList = new Subject<Course>();
  disableCourseList = new Subject<Course>();
  updateEarnings = new Subject<boolean>();
  constants = constants.default;

  constructor(public http: HttpClient, private toast: NgToastService) {}

  fetchCourses(page: number = 1, size: number = 8): Observable<CourseStatus[]> {
    const url = `http://127.0.0.1:8000/courses?page=${page}&size=${size}`;
    return this.http.get<CourseStatus[]>(url);
  }

  fetchPurchasedCoures(): Observable<Course[]> {
    return this.http.get<Course[]>('http://127.0.0.1:8000/purchased_courses');
  }

  fetchPendingCourseReqeust(): Observable<Course[]> {
    return this.http.get<Course[]>('http://127.0.0.1:8000/pending_courses');
  }

  fetchMentorEarning() {
    return this.http.get<MentorEarning[]>('http://127.0.0.1:8000/mentor');
  }

  fetchCourseFaqs(courseName: string): Observable<CourseFaq[]> {
    const url = `http://127.0.0.1:8000/courses/${courseName}/user_faq`;
    return this.http.get<CourseFaq[]>(url);
  }

  fetchCourseFeedbacks(courseName: string): Observable<CourseFeedback[]> {
    const url = `http://127.0.0.1:8000/courses/${courseName}/user_feedback`;
    return this.http.get<CourseFeedback[]>(url);
  }

  disableCourse(course: Course) {
    const url = `http://127.0.0.1:8000/courses/${course.name}`;
    return this.http.put(url, {}).subscribe({
      next: (response) => {
        console.log(response);
        this.disableCourseList.next(course);
        if (response['code'] === 200) {
          this.toast.info({
            detail: response['message'],
            summary: this.constants.COURSE_NOT_AVAILABLE,
          });
        }
      },
    });
  }

  approveCourse(course: Course, approval_status: string): void {
    this.http
      .put('http://127.0.0.1:8000/courses', {
        course_name: course.name,
        approval_status: approval_status,
      })
      .subscribe({
        next: (response) => {
          this.updateCourseList.next(course);

          if (response['code'] === 202) {
            this.toast.info({
              detail: this.constants.COURSE_APPROED,
              summary: this.constants.COURSE_AVAILABLE,
            });
          } else if (response['code'] === 200) {
            this.toast.info({
              detail: this.constants.COURSE_REJECTED,
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 500) {
            this.toast.error({
              detail: this.constants.ERROR_REJECTING,
              summary: this.constants.TRY_AGAIN,
            });
          }
        },
      });
  }

  addMentor(mentorName: string): void {
    this.http
      .post('http://127.0.0.1:8000/mentor/', {
        username: mentorName,
      })
      .subscribe({
        next: (response) => {
          if (response['code'] === 201) {
            this.toast.success({
              detail: response['message'],
              summary: this.constants.ADD_NEW_COURSE,
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 404) {
            this.toast.warning({
              detail: this.constants.NO_USER_EXISTS,
              summary: this.constants.ANOTHER_USERNAME,
            });
          } else if (error.error.error.code === 409) {
            this.toast.warning({
              detail: error.error.error.message,
              summary: this.constants.ANOTHER_USERNAME,
            });
          } else {
            this.toast.error({
              detail: this.constants.ERROR_OCCURRED,
              summary: this.constants.TRY_AGAIN,
            });
          }
        },
      });
  }

  addFaq(faq: Faq, courseName: string): void {
    const url = `http://127.0.0.1:8000/courses/${courseName}/user_faq`;

    this.http
      .post(url, {
        question: faq.question,
        answer: faq.answer,
      })
      .subscribe({
        next: (response) => {
          if (response['code'] === 200) {
            this.toast.success({
              detail: this.constants.SUCCESS,
              summary: response['message'],
            });
          }
        },
      });
  }

  addFeedback(courseName: string, feedback: string, rating: number): void {
    rating = Number(rating);
    const url = `http://127.0.0.1:8000/courses/${courseName}/user_feedback`;
    this.http
      .post(url, {
        ratings: rating,
        comments: feedback,
      })
      .subscribe({
        next: (response) => {
          if (response['code'] === 200) {
            this.toast.success({
              detail: this.constants.SUCCESS,
              summary: response['message'],
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 403) {
            this.toast.error({
              detail: this.constants.CANNOT_ADD_FB,
              summary: this.constants.PURCHASE_ADD_FB,
            });
          } else if (error.error.error.code === 409) {
            this.toast.info({
              detail: error.error.error.message,
            });
          }
        },
      });
  }

  addCourse(courseData: any): void {
    this.http
      .post('http://127.0.0.1:8000/courses/', {
        name: courseData.name,
        content: courseData.video,
        price: courseData.price,
        duration: courseData.duration,
      })
      .subscribe({
        next: (response) => {
          this.updateEarnings.next(true);
          if (response['code'] === 201) {
            this.toast.info({
              detail: this.constants.APPROVAL_REQUEST,
              summary: this.constants.ADMIN_TO_APPROVE,
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 403) {
            this.toast.error({
              detail: this.constants.NOT_ALLOWED_TO_ADD_COURSE,
              summary: this.constants.ASK_MENTOR,
            });
          } else if (error.error.error.code === 409) {
            this.toast.warning({
              detail: this.constants.ANOTHER_COURSE,
              summary: this.constants.ADD_ANOTHER_COURSE,
            });
          }
        },
      });
  }

  purchaseCourse(course: Course): void {
    this.http
      .post('http://127.0.0.1:8000/courses/' + course.name, {}, {})
      .subscribe({
        next: (response) => {
          if (response['code'] === 200) {
            this.toast.success({
              detail: response['message'],
              summary: this.constants.VISIT_MY_LEARNING,
            });
          }
        },
        error: (error) => {
          if (error.error.error.code === 409) {
            this.toast.info({
              detail: error.error.error.message,
              summary: this.constants.VISIT_MY_LEARNING,
            });
          } else {
            this.toast.error({
              detail: this.constants.ERROR_OCCURRED,
              summary: this.constants.TRY_AGAIN,
            });
          }
        },
      });
  }
}
