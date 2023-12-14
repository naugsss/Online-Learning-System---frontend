import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';

import { Course } from '../course/course.model';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css'],
})
export class CourseFilterComponent {
  course: Course[];

  @Output() ratingSelected = new EventEmitter<number>();

  filterCourseByRating(rating: number) {
    this.ratingSelected.emit(rating);
  }
}
