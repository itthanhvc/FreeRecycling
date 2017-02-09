import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { Donation } from '../../model/donation.model'
import { displayFullState } from '../../displayFullState.pipe';

@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css']
})
export class DonationDetailsComponent implements OnInit {
  donation: Donation;
  constructor(private route: ActivatedRoute, private ds: DataService) {
    this.donation = new Donation();

    this.route.params.subscribe(params => {
      this.ds.getDonationByGUID(params['id'])
        .subscribe(data => {
          this.donation = data
        });
    });
  }

  ngOnInit() {
  }

}
