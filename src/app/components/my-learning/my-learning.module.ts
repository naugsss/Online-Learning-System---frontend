import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MyLearningComponent } from './my-learning.component';
import { CourseContentComponent } from './course-content/course-content.component';

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
