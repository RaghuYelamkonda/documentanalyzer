import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardModule} from './dashboard/dashboard.module';
import { HeaderModule} from './header/header.module';
import { ContactModule} from './contact/contact.Module';
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
    NgbModule.forRoot(),
    BrowserModule,
    SharedModule,
    ContactModule,
    DashboardModule,
    HeaderModule,
    LoginModule,
    AlertModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
