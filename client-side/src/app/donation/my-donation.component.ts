import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Observable} from 'rxjs/Rx'

import { AuthenticationService } from '../service/authentication.service';
import { DataService } from '../service/data.service';
import {AppConstant} from '../app.constant';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css'],

})

export class MyDonationComponent implements OnInit {
  title: string = "Donation";
  file:File;
  donationForm: FormGroup;
  myLocation = { long: 1, lat: 1, set: false };
  
  donateEvent : EventEmitter<any>;

  private formData: FormData = new FormData();
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
      "image": [""],
      "imageBase64":[""]
    });

    this.donationForm.valueChanges.subscribe((data: any) => {
      this.formData = data
    });

    this.donateEvent = new EventEmitter();
  }

  ngOnInit() {
    //console.log(this.authenticationService.UserLogin.);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
  }


  onChange(event){
    this.file = event.srcElement.files[0];
    console.log("Name: "+this.file.name);
    var reader = new FileReader();
    let self = this;
    reader.onload = function(){
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
