import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  states: Array<string> = [];
  cities: Array<string> = [];
  items: Array<string> = [];
  isstate: boolean;
  iscity: boolean;
  isitem: boolean;
  braidCumb: Object;
  constructor(private route: ActivatedRoute) {
    this.states = ["Iowa", "Illinois", "California", "Iowa", "Illinois", "California", "Iowa", "Illinois", "California"];
    this.cities = ["Fairfield", "Ottumwa", "Burlington"];
    this.items = ["Bike1", "Bike2", "Bike3"];
    this.braidCumb = { 'state': '', 'city': '', 'item': '' };
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
  }
  onStateClick(value: string) {
    this.isstate = false;
    this.iscity = true;
    this.isitem = false;
    this.braidCumb['state'] = value;
  }
  onCityClick(value: string) {
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
    this.braidCumb['city'] = value;
  }
  onItemClick(value: string) {
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
    this.braidCumb['item'] = value;
  }
  onStateBraidCumb() {
    this.isstate = false;
    this.iscity = true;
    this.isitem = false;
    this.braidCumb['item'] = '';
    this.braidCumb['city'] = '';
    this.braidCumb['state'] = '';
  }
  onCityBraidCumb() {
    this.isstate = false;
    this.iscity = false;
    this.isitem = true;
    this.braidCumb['item'] = '';
  }
  onItemBraidCumb() {
    // this.isstate = false;
    // this.iscity = false;
    // this.isitem = false;
  }
  onHomeBraidCumb(){
    this.isstate = true;
    this.iscity = false;
    this.isitem = false;
  }
  ngOnInit() {
    console.log(this.braidCumb['item']);
  }

}
