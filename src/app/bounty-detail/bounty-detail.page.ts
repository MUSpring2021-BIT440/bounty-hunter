import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bounty-detail',
  templateUrl: './bounty-detail.page.html',
  styleUrls: ['./bounty-detail.page.scss'],
})
export class BountyDetailPage implements OnInit {

  public bounty: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.displayDetails()
  }

  displayDetails() {
    const bountyId = +this.route.snapshot.paramMap.get('id');

    const bounties: any[] = JSON.parse(localStorage.getItem('current_bounties'));

    this.bounty = bounties.find(bounty => bounty.id === bountyId)
  }

}
