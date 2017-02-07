import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-near-by',
  templateUrl: './near-by.component.html',
  styleUrls: ['./near-by.component.css']
})
export class NearByComponent implements OnInit {
  title:string = "Near By";
  constructor() { }

  ngOnInit() {
  }

}
