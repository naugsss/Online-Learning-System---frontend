import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

@NgModule({
  declarations: [CartComponent],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class CartModule {}
