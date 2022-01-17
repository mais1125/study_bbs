import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidenaviComponent } from './sidenavi.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SidenaviComponent],
  imports: [CommonModule, ButtonModule],
  exports: [SidenaviComponent],
})
export class SidenaviModule {}
