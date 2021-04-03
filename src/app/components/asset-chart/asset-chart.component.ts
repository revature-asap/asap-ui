import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { assetCandle } from 'src/app/models/assetCandle';
import { FinnhubService } from '../../services/finnhub.service';
import { DateTimeService } from '../../services/date-time.service';

@Component({
  selector: 'asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.css']
})
export class AssetChartComponent implements OnInit {
  @Input() chartTitle = 'Asset Chart';
  @Input() height = 400;
  @Input() chartType = 'candlestick'; // default for charts
  @Input() assetTicker = 'AAPL'; // default ticker is Apple

  assetTimeInterval = '5m';
  loadingGraph = false;
  dynamicResize = true;

  type : ChartType = ChartType.CandlestickChart;
  chartData : any[] = [];

  constructor(private finnhubService : FinnhubService, private dateTimeService : DateTimeService) {}

  ngOnInit(): void { 
    this.getChartData();
  }

  setChartType() {
    this.type = this.chartType === 'candlestick' ? ChartType.CandlestickChart : ChartType.LineChart;
  }

  chartTypeChange = (childChartType: string): void => {
    this.chartType = childChartType;
    this.setChartType();
  }

  timeIntervalChange = (childTimeInterval: string): void => {
    this.assetTimeInterval = childTimeInterval;
    this.getChartData();
  }

  getChartData(scaleDate: number = 1) {
    this.chartData = [];
    
    if (scaleDate >= 15) {
      alert("Too many calls to the finnhub api have been made. Try refreshing the page.");
      this.loadingGraph = false;
      return;
    }

    this.setChartType();
    
    let assetTime = this.dateTimeService.getTimeInterval(scaleDate, this.assetTimeInterval);

    this.loadingGraph = true;
    let fhd = this.finnhubService.getCandle(this.assetTicker, "1", assetTime.pastTime.toString(), 
      assetTime.currentTime.toString());

    fhd.toPromise().then(data => {
      let acd = new assetCandle(data);

      if (acd.status === 'no_data') {
        this.getChartData(++scaleDate);
        return;
      }

      let length = acd.close.length;

      for (let i=0; i<length; i++) {
        let candlestick : Array<string | number> = [];
        let assetDate = new Date(acd.timestamp[i] * 1000);

        console.log("assetdate " + assetDate);

        candlestick.push(this.dateTimeService.getFormattedDate(
          assetDate.getDate(), 
          assetDate.getMonth(), 
          assetDate.getFullYear(),
          assetDate.getHours() - (assetDate.getTimezoneOffset() / 60),
          assetDate.getMinutes(), 
          assetDate.getSeconds())
        );

        candlestick.push(acd.high[i]);

        if (acd.open[i] > acd.close[i]) {
          candlestick.push(acd.open[i]);
          candlestick.push(acd.close[i]);
        } else {
          candlestick.push(acd.close[i]);
          candlestick.push(acd.open[i]);
        }
        
        candlestick.push(acd.low[i]);

        this.chartData.push(candlestick);
        this.loadingGraph = false;
      }
    }).catch(error => this.loadingGraph = false);
  }
}