import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminMentorComponent } from './admin-mentor/admin-mentor.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  declarations: [AdminComponent, AdminCoursesComponent, AdminMentorComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
