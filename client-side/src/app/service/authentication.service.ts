import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AppConstant } from '../app.constant';
import { LoginInfo } from '../model/login.model';

@Injectable()
export class AuthenticationService {
    loggedInSucessful: EventEmitter<LoginInfo>
    loggedOutSuccessFull: EventEmitter<any>

    constructor(private http: Http) {
        this.loggedInSucessful = new EventEmitter();
        this.loggedOutSuccessFull = new EventEmitter();
    }

    get UserLogin(): LoginInfo {
        if (localStorage['currentUser'] == undefined)
            return null;

        let user = JSON.parse(localStorage['currentUser']);
        return new LoginInfo(user.data.firstName, user.data.lastName, user.data.email, user.data.token);
    }

    login(username: string, password: string) {
        return this.http.post(AppConstant.SERVER_URL + '/api/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedInSucessful.emit(this.UserLogin);
                }
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedOutSuccessFull.emit();

    }


}