import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardModule} from './dashboard/dashboard.module';
import { SidebarModule} from './sidebar/sidebar.module';
import { HeaderModule} from './header/header.module';
import { FooterModule} from './footer/footer.module';
import { DocumentsModule} from './documents/documents.Module';
import { UploadModule} from './upload/upload.Module';
import { ContactModule} from './contact/contact.Module';
import { ErrorModule} from './error/error.module';
import { SharedModule} from './shared/shared.module';
import { LoginModule} from './login/login.module';
import { AlertModule} from './alert/alert.module';
import { AppRoutingModule } from './app.routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    SharedModule,
    UploadModule,
    ContactModule,
    DocumentsModule,
    DashboardModule,
    SidebarModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    AlertModule,
    ErrorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
