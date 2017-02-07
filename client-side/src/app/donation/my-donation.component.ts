import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//import {} from "../service/data.service";

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css']
})
export class MyDonationComponent implements OnInit {
  title: string = "Donation";
  donationForm;
  asd;
  myLocation = {long: 1, lat:1, set:false};

  myDonations = [{ _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" },
  { _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" }];

  constructor(fb: FormBuilder) {
    this.donationForm = fb.group({
      "itemName": ['Item name', Validators.required],
      "shortDescription": [""],
      "itemDetails": [""],
      "email": ["utkuguleviz@gmail.com", Validators.required],
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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      };
   }

   setPosition(position){
    this.myLocation.set = true;
    console.log(position.coords.latitude + ' ' + position.coords.longitude);
    this.myLocation.lat = position.coords.latitude;
    this.myLocation.long = position.coords.longitude;
    console.log(this.myLocation.lat + ' ' + this.myLocation.long);
  }

  addDonation() {
    console.log("Add donation");
  }

  uploadImage() {
    var preview = document.getElementById('imagePreview');
    var file = document.querySelector('input[type=file]')[0].files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      preview.setAttribute("src", reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
