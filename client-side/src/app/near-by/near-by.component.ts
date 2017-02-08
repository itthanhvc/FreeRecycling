import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { DonationComponent } from '../donation/donation.component';

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.css']
})
export class NearByComponent implements OnInit {
  // title: string = "Near By";
  // private lat: number;
  // private long: number;
  // myDonations = [{ _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  // { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  // { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" },
  // { _id: 1, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle", email: "utku@gmail.com" },
  // { _id: 2, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle2", email: "sunil@gmail.com" },
  // { _id: 3, imageUrl: "http://localhost:3000/images/profilephoto.jpg", itemName: "Bicycle3", email: "thanh@gmail.com" }];
  // constructor(private dataservice: DataService) {
  //   this.lat = 41.018210;
  //   this.long = -91.970417;
  //   dataservice.getNearbyDonations(this.long, this.lat).subscribe(res => {
  //     this.myDonations=res.json();
  //   });
  // }

  ngOnInit() {
  }

}
