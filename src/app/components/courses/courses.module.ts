import { NgModule } from '@angular/core';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { CourseRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CoursePreviewComponent,
    // LoadingSpinnerComponent,
  ],
  imports: [
    CourseRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [CourseComponent],
})
export class CoursesModule {}
