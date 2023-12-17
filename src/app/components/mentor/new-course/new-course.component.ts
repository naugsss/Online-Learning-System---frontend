import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course, newCourse } from '../../courses/course/course.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css'],
})
export class NewCourseComponent {
  constructor(private courseDataService: CourseDataService) {}
  @ViewChild('courseForm') form: NgForm;
  // @Output() courseAdded = new EventEmitter<newCourse>();

  onSubmit(): void {
    const courseData = {
      name: this.form.value.name,
      price: +this.form.value.price,
      duration: +this.form.value.duration,
      video: this.form.value.video,
    };
    this.courseDataService.addCourse(courseData);
    this.form.reset();
  }
}
