import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    error: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.error = "";
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            response => {
                this.loading = false;
                if (!response.type) {
                    this.error = response.data;
                    return;
                }
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.error = "Something wrongs!! Please contact admin."
                this.loading = false;
            });
    }
}