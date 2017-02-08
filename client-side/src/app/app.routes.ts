import { RouterModule, Routes } from "@angular/router";

import { StateComponent } from "./state/state.component";
import { MyDonationComponent } from "./donation/my-donation.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NearByComponent } from "./near-by/near-by.component";
import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { AuthGuard } from './guard/auth.guard'

// import { MyCanDeactivateGuard } from "./guards/mycandeactivate.guard";

const MY_ROUTES: Routes = [
    { path: '', component: StateComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'mydonate', component: MyDonationComponent, canActivate: [AuthGuard] },
    { path: 'donationdetails/:id', component: DonationDetailsComponent, canActivate: [AuthGuard] },
    { path: 'nearby', component: NearByComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
