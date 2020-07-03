import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { from } from 'rxjs';
import { GlobalDataSummary } from 'src/app/models/GlobalDataSummary';
// import { GlobalDataSummary } from 'src/app/models/globalData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

// tslint:disable-next-line: max-line-length
private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/07-01-2020.csv';

constructor(private httpclient: HttpClient) { }

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
          console.log(raw);

       //   console.log(data);

          return Object.values(raw) as GlobalDataSummary[];
        })
      );
    }
}
