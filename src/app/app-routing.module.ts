import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { CourseContentComponent } from './components/my-learning/course-content/course-content.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'courses',
    loadChildren: () =>
      import('./components/courses/courses.module').then(
        (module) => module.CoursesModule
      ),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then(
        (module) => module.AdminModule
      ),
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./components/mentor/mentor.module').then(
        (module) => module.MentorModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./components/cart/cart.module').then(
        (module) => module.CartModule
      ),
  },
  {
    path: 'myLearning',
    component: MyLearningComponent,
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
