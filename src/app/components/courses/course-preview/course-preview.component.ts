import { Component, OnDestroy, OnInit } from '@angular/core';

import { Course, CourseFaq, CourseFeedback } from '../course/course.model';
import { CourseService } from '../../../services/course.service';
import { cartService } from '../../../services/cart.service';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { Subscription } from 'rxjs';
import * as constants from '../../../shared/constants/courses.constants';
@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css'],
})
export class CoursePreviewComponent implements OnInit, OnDestroy {
  selectedCourse: Course;
  faqs: CourseFaq[] = [];
  feedback: CourseFeedback[] = [];
  subscription: Subscription;
  constants = constants.default;
  constructor(
    private courseService: CourseService,
    private cartService: cartService,
    private courseDataService: CourseDataService
  ) {}

  ngOnInit(): void {
    this.selectedCourse = this.courseService.getSelectedCourse();
    this.subscription = this.courseDataService
      .fetchCourseFaqs(this.selectedCourse.name)
      .subscribe((faq) => {
        this.faqs = faq;
      });

    this.courseDataService
      .fetchCourseFeedbacks(this.selectedCourse.name)
      .subscribe((feedback) => {
        this.feedback = feedback;
      });
  }

  addTocart(course: Course) {
    this.cartService.addToCart(course);
  }

  onBuyNowClick(course: Course) {
    this.courseDataService.purchaseCourse(course);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
