import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs/Rx'

import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';
import { AppConstant } from '../app.constant';
import { reverseGeocode, NominatimResponse } from 'nominatim-browser'

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css'],

})

export class MyDonationComponent implements OnInit {
  title: string = "Donation";
  file: File;
  donationForm: FormGroup;
  myLocation = { long: 1, lat: 1, set: false };

  donateEvent: EventEmitter<any>;

  private formData: FormData = new FormData();
  myDonations: any[];
  constructor(fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private ds: DataService) {
    this.donationForm = fb.group({
      "itemName": ["", Validators.required],
      "shortDescription": [""],
      "itemDetails": [""],
      "email": ['', Validators.required],
      "phone": [""],
      "category": [""],
      "state": ["", Validators.required],
      "city": ["", Validators.required],
      "long": [""],
      "lat": [""],
      "image": [""],
      "imageBase64": [""]
    });

    this.donationForm.valueChanges.subscribe((data: any) => {
      this.formData = data
      if (this.formData['state'] != "" && AppConstant.states[this.formData['state']] != undefined) {
        this.formData['state'] = AppConstant.states[this.formData['state']];
      }
    });

    this.donateEvent = new EventEmitter();
    this.donationForm.controls['email'].setValue(this.authenticationService.UserLogin.email);
  }

  ngOnInit() {
    //console.log(this.authenticationService.UserLogin.);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
  }


  onChange(event) {
    this.file = event.srcElement.files[0];
    console.log("Name: " + this.file.name);
    var reader = new FileReader();
    let self = this;
    reader.onload = function () {
      var dataURL = reader.result;
      /*var output = document.getElementById('output');
      output.src = dataURL;*/
      self.donationForm.controls['imageBase64'].setValue(dataURL);
      console.log(self.donationForm.controls['imageBase64']);
    };
    reader.readAsDataURL(this.file);
  }

  setPosition(position) {
    this.myLocation.set = true;
    this.myLocation.lat = position.coords.latitude;
    this.myLocation.long = position.coords.longitude;
    this.donationForm.controls['lat'].setValue(position.coords.latitude)
    this.donationForm.controls['long'].setValue(position.coords.longitude);
    reverseGeocode({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      addressdetails: true
    }).then((result: NominatimResponse) => {
      this.donationForm.controls['city'].setValue(result.address.city);
      this.donationForm.controls['state'].setValue(result.address.state);
    }).catch((error) => {
      console.error(error);
    });
  }

  addDonation() {

    console.log(this.formData);

    this.ds.postNewDonation(this.formData).subscribe(data => {
      console.log("Added!");
      this.donateEvent.emit();
    },
      error => {
        console.log("Error");
      });
  }

}
