import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [AlertComponent],
  exports: [AlertComponent]
})
export class AlertModule { }
