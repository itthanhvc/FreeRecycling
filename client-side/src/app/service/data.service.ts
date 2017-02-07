import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { User } from '../model/user.model';
import { AppConstant } from '../app.constant'

@Injectable()
export class DataService {
    constructor(private http: Http) { }
    createUser(user: User) {
        return this.http.post(AppConstant.SERVER_URL + '/api/user/signup', { user: user }, this.jwt()).map((response: Response) => response.json());
    }

    getMyDontations(email:string){
        let params = new URLSearchParams();
        params.set('email', email);
        return this.http.get(AppConstant.SERVER_URL + '/donations/mydonations', {search: params});
    }

    getCloseDonations(long, lat){
        let params = new URLSearchParams();
        params.set('long', long);
        params.set('lat', lat);
        return this.http.get(AppConstant.SERVER_URL + '/donations/close', {search: params});
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}