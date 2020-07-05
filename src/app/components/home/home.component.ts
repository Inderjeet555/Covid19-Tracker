import { Component, OnInit, Input } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) { }


  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  datatable = [];
  chart = {
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
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


  initChart(caseType: string) {
    this.datatable = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalData.forEach(cs => {
      let value: number;
      if (caseType === 'c')
        if (cs.confirmed > 2000)
          value = cs.confirmed;

      if (caseType === 'a')
        if (cs.active > 2000)
          value = cs.active;
      if (caseType === 'd')
        if (cs.deaths > 1000)
          value = cs.deaths;

      if (caseType === 'r')
        if (cs.recovered > 2000)
          value = cs.recovered;


      this.datatable.push([
        cs.country, value
      ]);
    });
    console.log(this.datatable);
  }

  ngOnInit() {
    this.dataService.getGlobalData()
      .subscribe({
        next: (result) => {
          // console.log(result);
          this.globalData = result;
          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active;
              this.totalConfirmed += cs.confirmed;
              this.totalDeaths += cs.deaths;
              this.totalRecovered += cs.recovered;
            }
          });
          // console.log(this.totalActive);
          // console.log(this.globalData);
          this.initChart('c');
        }
        , complete: () => {
         this.loading = false;
        }
      });
  }

  updateChart(Input: HTMLInputElement) {
    console.log(Input.value);
    this.initChart(Input.value);
  }

}
