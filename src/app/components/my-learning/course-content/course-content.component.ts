import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../courses/course/course.model';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
})
export class CourseContentComponent implements OnInit {
  selectedRating: number = 0;
  feedbackText: string = '';
  @Input() course: Course;

  ngOnInit(): void {
    // console.log(this.course);
  }

  submitFeedback(): void {
    console.log(
      `Rating: ${this.selectedRating}, Feedback: ${this.feedbackText}`
    );
  }
}
