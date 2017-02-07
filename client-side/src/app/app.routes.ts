import { RouterModule, Routes } from "@angular/router";

import { StateComponent } from "./state/state.component";
import { MyDonationComponent } from "./donation/my-donation.component";
import { LoginComponent } from "./login/login.component";
import { NearByComponent } from "./near-by/near-by.component";

// import { MyCanDeactivateGuard } from "./guards/mycandeactivate.guard";

const MY_ROUTES: Routes = [
    { path: '', component: StateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mydonate', component: MyDonationComponent },
    { path: 'nearby', component: NearByComponent },
    { path: '**', redirectTo: '/login' }
];

export const myRoutes = RouterModule.forRoot(MY_ROUTES);
