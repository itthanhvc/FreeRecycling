import { RouterModule, Routes } from "@angular/router";

import { StateComponent } from "./state/state.component";
import { MyDonationComponent } from "./donation/my-donation.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NearByComponent } from "./near-by/near-by.component";
import {DonationDetailsComponent} from './donation-details/donation-details.component';

// import { MyCanDeactivateGuard } from "./guards/mycandeactivate.guard";

const MY_ROUTES: Routes = [
    { path: '', component: StateComponent, children: [] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'mydonate', component: MyDonationComponent },
    { path: 'donationdetails/:id', component: DonationDetailsComponent },
    { path: 'nearby', component: NearByComponent },
    { path: '**', redirectTo: '/login' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
