import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bounty-detail',
  templateUrl: './bounty-detail.page.html',
  styleUrls: ['./bounty-detail.page.scss'],
})
export class BountyDetailPage implements OnInit {

  public id: number;
  public bounty: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.displayDetails()
  }

  displayDetails() {
    this.id = +this.route.snapshot.paramMap.get('id');

    const bounties: any[] = JSON.parse(localStorage.getItem('current_bounties'));

    this.bounty = bounties.find(bounty => bounty.id === this.id)
  }

  startHunt() {
    localStorage.setItem('current_bounty', JSON.stringify(this.id))

    this.router.navigate(['bounty-active']);
  }

}
