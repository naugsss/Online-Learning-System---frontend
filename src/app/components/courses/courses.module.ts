import { NgModule } from '@angular/core';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { CourseRoutingModule } from './courses-routing.module';
import { MyLearningComponent } from '../my-learning/my-learning.component';
import { HomeComponent } from '../home/home.component';
import { CourseContentComponent } from '../my-learning/course-content/course-content.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    MyLearningComponent,
    HomeComponent,
    CourseContentComponent,
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
