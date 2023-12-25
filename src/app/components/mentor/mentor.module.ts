import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AddFaqComponent } from './add-faq/add-faq.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { MentorGuard } from 'src/app/components/mentor/guards/mentor.guard';
import { MentorComponent } from './mentor.component';

const routes: Routes = [
  {
    path: '',
    component: MentorComponent,
    canActivate: [MentorGuard],
  },
];

@NgModule({
  declarations: [MentorComponent, AddFaqComponent, NewCourseComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MentorModule {}
