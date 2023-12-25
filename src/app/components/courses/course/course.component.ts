import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from './course.model';
import { cartService } from '../../../services/cart.service';
import { CoursePreviewComponent } from '../course-preview/course-preview.component';
import { CourseService } from '../../../services/course.service';
import * as constants from '../../../shared/constants/course.constants';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @Input() course: Course;
  @Input() index: number;
  @Input() price: boolean = true;
  @ViewChild(CoursePreviewComponent) coursePreview: CoursePreviewComponent;
  constants = constants.default;

  constructor(
    private cartService: cartService,
    private router: Router,
    private courseService: CourseService
  ) {}

  cardClick(): void {
    this.courseService.setSelectedCourse(this.course);
    if (this.router.url === '/courses') {
      this.router.navigate(['courses', this.course.name]);
    } else if (this.router.url === '/myLearning') {
      this.router.navigate(['myLearning', this.course.name]);
    }
  }

  addTocart(course: Course): void {
    this.cartService.addToCart(course);
  }

  get filledStars(): number {
    return Math.floor(this.course.rating);
  }

  get partialStar(): boolean {
    return this.course.rating % 1 !== 0;
  }

  isOnCoursePage(): boolean {
    return this.router.url === '/courses';
  }

  isOnAdminPage(): boolean {
    return this.router.url === '/admin';
  }

  isOnCartPage(): boolean {
    return this.router.url === '/cart';
  }
}
