import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CoursePreviewComponent } from './course-preview/course-preview.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':courseName',
        component: CoursePreviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
