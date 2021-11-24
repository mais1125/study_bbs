import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadComponent } from './thread.component';

const routes: Routes = [
  {
    path: '',
    component: ThreadComponent,
  },
];

@NgModule({
  declarations: [ThreadComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [ThreadComponent],
})
export class ThreadRoutingModule {}
