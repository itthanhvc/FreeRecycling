import { Component, OnInit } from '@angular/core';
//import {} from "../service/data.service";

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css']
})
export class MyDonationComponent implements OnInit {
  title:string = "Donation";
  myDonations = [{_id: 1, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email:"utku@gmail.com"},
                 {_id: 2, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email:"sunil@gmail.com"},
                 {_id: 3, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email:"thanh@gmail.com"},
                 {_id: 1, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email:"utku@gmail.com"},
                 {_id: 2, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email:"sunil@gmail.com"},
                 {_id: 3, imageUrl:"http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email:"thanh@gmail.com"}]; 

  constructor() { }

  ngOnInit() {
  }

}
