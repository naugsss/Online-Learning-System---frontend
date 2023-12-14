import { Component } from '@angular/core';

import { Course } from '../course/course.model';
import { CourseService } from '../course.service';
import { cartService } from '../../cart/cart.service';
import { CourseDataService } from 'src/app/shared/courseData.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css'],
})
export class CoursePreviewComponent {
  selectedCourse: Course;

  constructor(
    private courseService: CourseService,
    private cartService: cartService,
    private courseDataService: CourseDataService
  ) {}

  ngOnInit(): void {
    this.selectedCourse = this.courseService.getSelectedCourse();
  }

  addTocart(course: Course) {
    this.cartService.addToCart(course);
  }

  onBuyNowClick(course: Course) {
    this.courseDataService.purchaseCourse(course);
  }
}
