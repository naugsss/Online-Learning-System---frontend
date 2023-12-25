import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';

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
