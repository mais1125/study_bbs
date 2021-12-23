import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './category.component';
// primeNg module
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

const primengModule = [
  DialogModule,
  InputTextModule,
  InputTextareaModule,
  ButtonModule,
];

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...primengModule,
  ],
  exports: [CategoryComponent],
})
export class CategoryRoutingModule {}
