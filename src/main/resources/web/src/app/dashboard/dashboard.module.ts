import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AlertModule } from '../alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    AlertModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
