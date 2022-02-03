import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';
import { BreadcrumbModule } from '../common/breadcrumb/breadcrumb.module';

// primeNg module
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule as Breadcrumb } from 'primeng/breadcrumb';

const primengModule = [
  DialogModule,
  InputTextModule,
  InputTextareaModule,
  ButtonModule,
  Breadcrumb,
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
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    BreadcrumbModule,
    ...primengModule,
  ],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
