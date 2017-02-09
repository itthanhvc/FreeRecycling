import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';
enum typeEnum {
  Location = 1,
  Geography = 2,
  Mine = 3
}
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./my-donation.component.css'],
  inputs: ['Location', 'Geography', 'Type', 'Donation']
})

export class DonationComponent implements OnInit {
  myDonations: any[];
  constructor(private authenticationService: AuthenticationService, private ds: DataService) {

  }
  //////////////////////////////////////////
  //Inputs from outside
  private _location: { state: string, city: string }; // state
  set Location(value) {
    this._location = value;
  }
  get Location(): any {
    return this._location;
  }

  private _donateEvent : EventEmitter<any>;
  set Donation(value){

    this._donateEvent=value;
   this. _donateEvent.subscribe(() => this.getMyDonations());
  }

  
  // Me
  private _type: typeEnum
  set Type(value) {
    this._type = value;
    this.loading();
  }
  get Type(): any {
    return this._type;
  }

  
  //////////////////////////////////////////
  ngOnInit() {
    //console.log(this.authenticationService.UserLogin.);

  }
  getMyDonations() {
    this.ds.getMyDontations(this.authenticationService.UserLogin.email).subscribe(result => this.myDonations = result);
  }
  markAsDonated(id){
    //subscribe donations
    this.ds.markAsDonated(id).subscribe(() => this.getMyDonations());
  }
  getDonationsByLocation() {
    this.ds.getDonationsByCityAndState(this.Location.city, this.Location.state)
      .subscribe(result => this.myDonations = result);
  }
  setPosition(position) {
    this.ds.getNearbyDonations(position.coords.longitude, position.coords.latitude)
      .subscribe(result => this.myDonations = result);
  }
  loading(): void {
    switch (this.Type) {
      case typeEnum.Location: {
        this.getDonationsByLocation();
        break;
      }
      case typeEnum.Geography: {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };
        break;
      }
      case typeEnum.Mine: {
        this.getMyDonations();
        break;
      }
    }
  }
}
