import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataService } from 'src/services/data-service.service';
import { Datewisedata } from 'src/app/models/datewisedata';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
  selectedCountryData: Datewisedata[];
  allDataDateWise;
  loading = true;
  dataTable = [];
  chart = {
    LineChart: 'LineChart',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  };

  ngOnInit() {

    merge(
      this.service.getGlobalDataDateWise().pipe(
        map(result => {
          this.allDataDateWise = result;
        })
      ),
      this.service.getGlobalData().pipe(
        map(result => {
          this.data = result;
          this.data.forEach(cs => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('India');
        this.loading = false;
      }
    });
  }

  updateValues(country: string) {
   // console.log(country);
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });

    this.selectedCountryData = this.allDataDateWise[country];
    this.updateChart();
  }

  updateChart() {
   this.dataTable = [];
   // this.dataTable.push(['Cases', 'Date']);
   this.selectedCountryData.forEach(cs => {
     this.dataTable.push([cs.date, cs.cases]);
     // console.log(this.dataTable);
   });
   console.log(this.selectedCountryData);
  }

}
