import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { from } from 'rxjs';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
import { Datewisedata } from 'src/app/models/datewisedata';
// import { GlobalDataSummary } from 'src/app/models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

// tslint:disable-next-line: max-line-length
private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-01-2020.csv';
// tslint:disable-next-line: max-line-length
private globalDataDatewsie = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

constructor(private httpclient: HttpClient) { }

    getGlobalDataDateWise() {
      return this.httpclient.get(this.globalDataDatewsie, {responseType: 'text'}).
      pipe(map(result => {
        let rows = result.split('\n');
        let mainData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);

        rows.splice(0, 1);

        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/);
          // console.log(cols);
          let con = cols[1];
          cols.splice(0 , 4);
         // console.log(con, cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            let dw: Datewisedata = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[con].push(dw);
          });
        });
        // console.log(mainData);
        return mainData;
      }));
    }

    getGlobalData() {
      return this.httpclient.get(this.globalDataUrl, {responseType: 'text'}).pipe(
        map(result => {
          let raw = {};
          let rows = result.split('\n');
          rows.splice(0, 1);

          rows.forEach(row => {
           let cols = row.split(/,(?=\S)/);
           let cs = {
             country: cols[3],
             confirmed: +cols[7],
             deaths: +cols[8],
             recovered: +cols[9],
             active: +cols[10]
           }
           let temp: GlobalDataSummary = raw[cs.country];

           if (temp) {
              temp.active = cs.active + temp.active;
              temp.confirmed = cs.confirmed + temp.confirmed;
              temp.deaths = cs.deaths + temp.deaths;
              temp.recovered = cs.recovered + temp.recovered;

              raw[cs.country] = temp;
           } else {
            raw[cs.country] = cs;
           }
          });
          //  console.log(raw);

       //   console.log(data);

          return Object.values(raw) as GlobalDataSummary[];
        })
      );
    }
}
