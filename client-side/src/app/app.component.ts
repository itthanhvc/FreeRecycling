import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { LoginInfo } from './model/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/Main.css', './css/utilities.css']
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

  constructor(public authSer: AuthenticationService) {
    authSer.loggedInSucessful.subscribe(user => {
      this.LoginInfo = user;
    })

    authSer.loggedOutSuccessFull.subscribe(() => {
      this.LoginInfo = null;
    })
  }

  logout() {
    this.authSer.logout();
  }
}
