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
    this.loadStates();
    this.braidCumb = { 'state': '', 'city': '', 'item': '' };
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
    if (localStorage.getItem("city") != null && localStorage.getItem("city") != "null") {
      console.log("city" + localStorage.getItem("city") + " state " + localStorage.getItem("state"));
      this.braidCumb["state"] = localStorage.getItem("state");
      this.location.state=localStorage.getItem("state");
      this.location.city=localStorage.getItem("city");
      this.loadCities(localStorage.getItem("city"));
      this.onCityClick(localStorage.getItem("city"));      
    }
    if (localStorage.getItem("city")==null && localStorage.getItem("state") != null && localStorage.getItem("state") != "null") {
      console.log("state" + localStorage.getItem("state"));
      this.loadStates();
      this.location.state=localStorage.getItem("state");
      this.onStateClick(localStorage.getItem("state"));
    }
  }
  onStateClick(value: string) {
    this.location.state = value;
    this.braidCumb['state'] = value;
    this.loadCities(value);
    this.isstate = false;
    this.iscity = true;
    this.isitem = false;
    localStorage.setItem("state", value);
    this.filter = "";
  }
  onCityClick(value: string) {
    this.location.city = value;
    this.braidCumb['city'] = value;
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
    localStorage.setItem("city", value);
    this.filter = "";
    console.log(this.cities);
  }
  onItemClick(value: string) {
    this.braidCumb['item'] = value;
  }
  onStateBraidCumb() {
    this.loadCities(this.braidCumb['state']);
    localStorage.removeItem("city");
    this.braidCumb['item'] = '';
    this.braidCumb['city'] = '';
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
  }
  onHomeBraidCumb() {
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
    this.braidCumb['item'] = '';
    this.braidCumb['city'] = '';
    this.braidCumb['state'] = '';
    localStorage.removeItem("state");
    localStorage.removeItem("city");
  }
  ngOnInit() {
  }
  loadStates() {
    this.dataservice.getStates().subscribe(res => {
      this.states = res.json();
    });
  }
  loadCities(value:string) {
    this.dataservice.getCitiesByState(value).subscribe(res => {
      this.cities = res.json();
    });
  }
}
