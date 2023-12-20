import { NgModule } from '@angular/core';
import { CourseContentComponent } from './course-content/course-content.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MyLearningComponent } from './my-learning.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyLearningComponent,
      },
      {
        path: ':courseName',
        component: CourseContentComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MyLearningModule {}
