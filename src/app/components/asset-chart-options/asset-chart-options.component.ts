import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'asset-chart-options',
  templateUrl: './asset-chart-options.component.html',
  styleUrls: ['./asset-chart-options.component.css']
})
export class AssetChartOptionsComponent implements OnInit {
  @Input() selectedChartType: string = 'candlestick';
  @Input() onChartTypeChange: ((args: any) => void) | undefined;
  @Output() chartTypeEvent = new EventEmitter<string>();
  chartSelection: string[] = ['candlestick', 'line'];

  propagateChartType(event: MatRadioChange) {
    this.chartTypeEvent.emit(event.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
