import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'asset-chart-options',
  templateUrl: './asset-chart-options.component.html',
  styleUrls: ['./asset-chart-options.component.css']
})
export class AssetChartOptionsComponent implements OnInit {
  @Input() selectedChartType: string = 'candlestick';
  @Output() chartTypeEvent = new EventEmitter<string>();
  @Output() timeIntervalEvent = new EventEmitter<string>();

  chartSelection: string[] = ['candlestick', 'line'];
  timeIntervalSelection : string[] = ['5m', '15m', '30m', '1h', '4h', '6h', '12h', '1d'];
  selectedTime: string = '5m';

  propagateChartType(event: MatRadioChange) {
    this.chartTypeEvent.emit(event.value);
  }

  propagateTimeInterval(event: MatSelectChange) {
    this.timeIntervalEvent.emit(event.value);
  }

  printTimeInterval(time: string) {
    let unit = time[time.length-1];
    let timeValue = time.slice(0, time.length-1);

    switch(unit) {
      case 'm':
        return timeValue + " minute" + (parseInt(timeValue) > 1 ? "s" : "");
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
