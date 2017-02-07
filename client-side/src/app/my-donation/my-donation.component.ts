import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-donation',
  templateUrl: './my-donation.component.html',
  styleUrls: ['./my-donation.component.css']
})
export class MyDonationComponent implements OnInit {
  title:string = "Donation";
  constructor() { }

  ngOnInit() {
  }

}
