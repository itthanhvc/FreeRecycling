import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../model/user.model';
const SERVER_URL : string ="http://localhost:1230"
@Injectable()
export class DataService {
    constructor(private http: Http) { }
    createUser(user: User) {

    }
     getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
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