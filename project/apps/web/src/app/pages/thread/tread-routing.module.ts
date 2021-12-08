import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThreadComponent } from './thread.component';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '',
    component: ThreadComponent,
  },
];

@NgModule({
  declarations: [ThreadComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
  ],
  exports: [ThreadComponent],
})
export class ThreadRoutingModule {}
