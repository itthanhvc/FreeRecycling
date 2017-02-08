import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css']
})
export class MyDonationComponent implements OnInit {
  title: string = "Donation";
  donationForm: FormGroup;
  myLocation = { long: 1, lat: 1, set: false };
  /*
  myDonations = [{ _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" },
  { _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" }];
  */
  myDonations: any[];
  constructor(fb: FormBuilder, private authenticationService: AuthenticationService, private ds: DataService) {
    this.donationForm = fb.group({
      "itemName": ['Item name', Validators.required],
      "shortDescription": [""],
      "itemDetails": [""],
      "email": [this.authenticationService.UserLogin.email, Validators.required],
      "phone": [""],
      "category": [""],
      "state": ["State", Validators.required],
      "city": ["City", Validators.required],
      "long": [""],
      "lat": [""],
      "image": [""]
    });
  }

  ngOnInit() {
    //console.log(this.authenticationService.UserLogin.);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
    this.getMyDonations();
  }

  getMyDonations() {
    this.ds.getMyDontations(this.authenticationService.UserLogin.email).subscribe(result => this.myDonations = result);
  }

  setPosition(position) {
    this.myLocation.set = true;
    this.myLocation.lat = position.coords.latitude;
    this.myLocation.long = position.coords.longitude;
  }

  addDonation() {
    console.log(this.donationForm.value);
    this.ds.postNewDonation(this.donationForm.value).subscribe(data => {
      console.log("Added!" + this.donationForm.value);
    },
      error => {
        console.log("Error");
      });
  }

}
