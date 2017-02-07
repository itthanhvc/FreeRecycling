import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { myRoutes } from './app.routes';
import { StateComponent } from './state/state.component';
import { MyDonationComponent } from './donation/my-donation.component';
import { NearByComponent } from './near-by/near-by.component';

import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { CollapseDirective } from 'ng2-bootstrap';
import { AuthenticationService } from './service/authentication.service';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginComponent,
    StateComponent,
    MyDonationComponent,
    NearByComponent,
    DonationDetailsComponent,
    CollapseDirective,
    RegisterComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    myRoutes
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
