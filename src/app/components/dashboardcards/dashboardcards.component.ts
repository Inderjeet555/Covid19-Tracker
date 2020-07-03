import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboardcards',
  templateUrl: './dashboardcards.component.html',
  styleUrls: ['./dashboardcards.component.css']
})
export class DashboardcardsComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('totalConfirmed')
  totalConfirmed;
  // tslint:disable-next-line: no-input-rename
  @Input('totalDeaths')
  totalDeaths;
  // tslint:disable-next-line: no-input-rename
  @Input('totalActive')
  totalActive;
  // tslint:disable-next-line: no-input-rename
  @Input('totalRecovered')
  totalRecovered;

  constructor() { }

  ngOnInit() {
  }

}
