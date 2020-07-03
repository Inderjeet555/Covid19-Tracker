import { Component } from '@angular/core';
import { GlobalDataSummary } from './models/GlobalDataSummary';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
}
