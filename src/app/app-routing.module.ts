import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.module').then(
        (module) => module.HomeModule
      ),
  },

  {
    path: 'signup',
    loadChildren: () =>
      import('./components/auth/signup/signup.module').then(
        (module) => module.SignUpModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login.module').then(
        (module) => module.LoginModule
      ),
  },

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
    loadChildren: () =>
      import('./components/my-learning/my-learning.module').then(
        (module) => module.MyLearningModule
      ),
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
