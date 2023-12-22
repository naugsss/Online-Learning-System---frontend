import { NgModule } from '@angular/core';
import { MentorComponent } from './mentor.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MentorGuard } from 'src/app/components/mentor/guards/mentor.guard';

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
