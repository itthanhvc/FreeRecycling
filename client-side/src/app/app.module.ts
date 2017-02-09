import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { myRoutes } from './app.routes';
import { StateComponent } from './state/state.component';
import { MyDonationComponent } from './donation/my-donation.component';
import { DonationComponent } from './donation/donation.component';
import { NearByComponent } from './near-by/near-by.component';

import { DonationDetailsComponent } from './donation/donation-details/donation-details.component';
import { CollapseDirective } from 'ng2-bootstrap';
import { AuthenticationService } from './service/authentication.service';
import { DataService } from './service/data.service';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { filterArray } from './filter-array.pipe';
import { displayFullState } from './displayFullState.pipe';
import { truncate } from './truncate.pipe';

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
    RegisterComponent,
    filterArray,
    truncate,
    displayFullState,
    DonationComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    myRoutes
  ],
  providers: [AuthenticationService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
