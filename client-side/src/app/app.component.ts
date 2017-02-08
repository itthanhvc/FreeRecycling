import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { LoginInfo } from './model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./content/css/Main.css', './content/css/utilities.css']
})

export class AppComponent {
  public isCollapsed: boolean = true;
  _loginInfo: LoginInfo;
  isAuthentication: boolean = false;

  set LoginInfo(value) {
    this.isAuthentication = (value != null);
    this._loginInfo = value;
  }
  get LoginInfo(): LoginInfo {
    return this._loginInfo;
  }

  constructor(public authSer: AuthenticationService, private router: Router, ) {
    this.LoginInfo = authSer.UserLogin;
    authSer.loggedInSucessful.subscribe(user => {
      this.LoginInfo = user;
    })

    authSer.loggedOutSuccessFull.subscribe(() => {
      this.LoginInfo = null;
    })
  }

  logout() {
    this.authSer.logout();
    this.router.navigate(['/login']);
  }
}
