import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'asset-chart-options',
  templateUrl: './asset-chart-options.component.html',
  styleUrls: ['./asset-chart-options.component.css']
})
export class AssetChartOptionsComponent implements OnInit {
  @Input() selectedChartType: string = 'line';
  @Output() chartTypeEvent = new EventEmitter<string>();
  @Output() timeIntervalEvent = new EventEmitter<string>();
  @Output() timescaleEvent = new EventEmitter<string>();


  chartSelection: string[] = ['candlestick', 'line'];
  timeIntervalSelection : string[] = ['1','5','15','30','60', 'D', 'W','M'];
  timescaleSelection: string[] = ['12h', '1d', '2d', '3d', '4d', '5d', '6d', '7d', '14d', '21d', '28d'];


  selectedTime: string = '60';
  selectedTimescale: string = '1d';

  propagateChartType(event: MatRadioChange) {
    this.chartTypeEvent.emit(event.value);
  }

  propagateTimeInterval(event: MatSelectChange) {
    this.timeIntervalEvent.emit(event.value);
  }

  propagateTimescale(event: MatSelectChange) {
    this.timescaleEvent.emit(event.value);
  }

  printTimeInterval(time: string) {
    switch(time) {
      case '1':
        return '1 minute';
      case '5': 
        return '5 minutes';
      case '15':
        return '15 minutes';
      case '30':
        return '30 minutes';
      case '60':
        return '1 hour';
      case 'D':
        return '1 day';
      case 'W':
        return '1 trading week';
      default:
        return '1 trading month';
    }
  }

  printTimescale(time: string) {
    let unit = time[time.length-1];
    let timeValue = time.slice(0, time.length-1);

    switch(unit) {
      case 'h':
        return timeValue + " hour" + (parseInt(timeValue) > 1 ? "s" : "");
      default:
        return timeValue + " day" + (parseInt(timeValue) > 1 ? "s" : "");
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
