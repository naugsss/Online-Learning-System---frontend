import { NgModule } from '@angular/core';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
];

@NgModule({
  declarations: [SignupComponent],
  imports: [FormsModule, RouterModule.forChild(routes), CommonModule],
})
export class SignUpModule {}
