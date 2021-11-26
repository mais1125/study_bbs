import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, RouterModule.forRoot(routes), DialogModule],
  exports: [CategoryComponent],
})
export class CategoryRoutingModule {}
