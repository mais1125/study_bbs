import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbModule as Breadcrumb } from 'primeng/breadcrumb';
@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, Breadcrumb],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
