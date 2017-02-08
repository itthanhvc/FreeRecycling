import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { DonationComponent } from '../donation/donation.component';
import { filterArray } from '../filter-array.pipe';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  states: Array<string> = [];
  cities: Array<string> = [];
  donations: Array<string> = [];
  isstate: boolean;
  iscity: boolean;
  isitem: boolean;
  braidCumb: Object;
  location = {
    state: "",
    city: ""
  };
  filter: string;
  constructor(private route: ActivatedRoute, private dataservice: DataService) {
    dataservice.getStates().subscribe(res => {
      this.states = res.json();
    });
    this.braidCumb = { 'state': '', 'city': '', 'item': '' };
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
  }
  onStateClick(value: string) {
    this.location.state = value;
    this.braidCumb['state'] = value;
    this.dataservice.getCitiesByState(this.braidCumb['state']).subscribe(res => {
      this.cities = res.json();
    });
    this.isstate = false;
    this.iscity = true;
    this.isitem = false;
  }
  onCityClick(value: string) {
    this.location.city = value;
    this.braidCumb['city'] = value;
    // this.dataservice.getDonationsByCityAndState(this.braidCumb['city'], this.braidCumb['state']).subscribe(res => {
    //   this.donations = res.json();
    // });
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
  }
  onItemClick(value: string) {
    this.braidCumb['item'] = value;
    // this.isstate = false;
    // this.iscity = false;
    // this.isitem = true;    
  }
  onStateBraidCumb() {
    this.braidCumb['item'] = '';
    this.braidCumb['city'] = '';
    this.braidCumb['state'] = '';
    this.isstate = false;
    this.iscity = true;
    this.isitem = false;
  }
  onCityBraidCumb() {
    this.braidCumb['item'] = '';
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
  }
  onItemBraidCumb() {
    // this.isstate = false;
    // this.iscity = false;
    // this.isitem = false;
  }
  onHomeBraidCumb() {
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
    this.braidCumb['item'] = '';
    this.braidCumb['city'] = '';
    this.braidCumb['state'] = '';
  }
  ngOnInit() {
  }

}
