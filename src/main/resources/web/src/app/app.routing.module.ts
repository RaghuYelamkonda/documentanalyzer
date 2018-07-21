import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { UploadComponent } from 'src/app/upload/upload.component';
import { ContactComponent } from 'src/app/contact/contact.component';
import { DocumentsComponent } from 'src/app/documents/documents.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from 'src/app/shared/gaurds/AuthGuard';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
