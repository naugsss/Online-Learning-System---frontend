import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './components/login/auth.guard';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { AdminComponent } from './components/admin/admin.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { CoursePreviewComponent } from './components/courses/course-preview/course-preview.component';
import { CourseContentComponent } from './components/my-learning/course-content/course-content.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:courseName',
    component: CoursePreviewComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin', component: AdminComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'myLearning',
    component: MyLearningComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'myLearning/:courseName',
    component: CourseContentComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
