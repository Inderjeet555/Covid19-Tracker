import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private service: DataService) { }
  data: GlobalDataSummary[] = [];
  totalConfirmed  = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  countries: string[] = [];

  ngOnInit() {
    this.service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
      // console.log(this.countries);
    });
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });
  }

}
