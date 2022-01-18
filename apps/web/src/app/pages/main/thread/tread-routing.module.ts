import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThreadComponent } from './thread.component';
// primeNg Module
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';

const primengModule = [
  DialogModule,
  ButtonModule,
  InputTextModule,
  InputTextareaModule,
  DividerModule,
];

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
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ...primengModule,
  ],
  exports: [RouterModule],
})
export class ThreadRoutingModule {}
