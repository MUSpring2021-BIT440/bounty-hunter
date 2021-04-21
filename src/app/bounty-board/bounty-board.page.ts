import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bounty-board',
  templateUrl: './bounty-board.page.html',
  styleUrls: ['./bounty-board.page.scss'],
})
export class BountyBoardPage implements OnInit {
  public bounties: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getBounties()
  }

  getBounties() {
    this.http.get('https://muspring2021-bit440.github.io/bounty-hunter-api/api/v1/current_bounties.json').subscribe( (data: any) => {
      this.bounties = data.current_bounties

      localStorage.setItem('current_bounties', JSON.stringify(data.current_bounties))
    })
  }

}
