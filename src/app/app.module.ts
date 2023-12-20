import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginInterceptorService } from './components/login/login.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { CourseContentComponent } from './components/my-learning/course-content/course-content.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CoursesModule } from './components/courses/courses.module';
import { MyLearningComponent } from './components/my-learning/my-learning.component';
import { AdminModule } from './components/admin/admin.module';
import { MentorModule } from './components/mentor/mentor.module';
import { CartModule } from './components/cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MyLearningComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    CourseContentComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CartModule,
    MentorModule,
    AdminModule,
    CoursesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
