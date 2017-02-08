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
        return this.http.get(AppConstant.SERVER_URL + '/api/donations/mydonations?email='+email, this.jwt()).map((response: Response) => response.json());
    }

    getNearbyDonations(long, lat){
        let params = new URLSearchParams();
        params.set('long', long);
        params.set('lat', lat);
        return this.http.get(AppConstant.SERVER_URL + '/api/donations/nearby', {search: params}).map((response: Response) => response.json());
    }

    postNewDonation(form){
        return this.http.post(AppConstant.SERVER_URL + '/api/donations/newdonation', {form:form},this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
    getStates(){
        return this.http.get(AppConstant.SERVER_URL + '/api/location',this.jwt());
    }
    getCitiesByState(state:string){
        return this.http.get(AppConstant.SERVER_URL + '/api/location/'+state,this.jwt());
    }
    getDonationsByCityAndState(city:string,state:string){
        return this.http.post(AppConstant.SERVER_URL + '/api/location/state/city',{city:city,state:state},this.jwt());
    }
}