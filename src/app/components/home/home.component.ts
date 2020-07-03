import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { DataService } from 'src/services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) { }


  totalConfirmed  = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };


  initChart() {
    debugger;
    let datatable = [];
    datatable.push(['country', 'cases']);
    this.globalData.forEach(cs => {
      if (cs.confirmed >= 20000) {
      datatable.push([
        cs.country, cs.confirmed
      ]);
      }
    });
    console.log(datatable);

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,

      options: { height: 500},
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: datatable,

      options: { height: 500},
    };
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
        this.initChart();
      }
    });
  }

}
