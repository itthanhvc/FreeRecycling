import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.css']
})
export class NearByComponent implements OnInit {
  title: string = "Near By";
  myDonations = [{ _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" },
  { _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" }];
  constructor() {
  }

  ngOnInit() {
  }

}
