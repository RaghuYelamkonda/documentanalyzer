import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from './service/upload.service'
import { AlertService } from 'src/app/shared/service/alert.service';
import { DocumentsService } from 'src/app/shared/service/documents.service';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { AuthGuard } from 'src/app/shared/gaurds/AuthGuard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [UploadService, AlertService, AuthenticationService, DocumentsService, AuthGuard]
})
export class SharedModule { }
