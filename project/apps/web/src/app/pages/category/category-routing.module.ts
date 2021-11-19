import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: 'category',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [CategoryComponent],
})
export class CategoryRoutingModule {}
