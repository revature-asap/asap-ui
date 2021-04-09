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
  @Input() assetTicker = 'AAPL'; // default ticker is Apple
  chartTitle = 'Asset Chart';
  height = 400;
  chartType = 'candlestick'; // default for charts
  
  assetTimeInterval = '60'; // the amount time a candlestick or a vertical set of points covers
  loadingGraph = false;
  dynamicResize = true;
  assetColumns = ['Time', 'Low', 'Open', 'Closed', 'High']; // labels for graph
  chartTimescale = '7d'; // overall time the graph covers

  type : ChartType = ChartType.CandlestickChart;
  chartData : any[] = [];

  lineOptions = {
    legend : {
      position: 'right'
    },
    crosshair: {
      color: 'black',
      trigger: 'both'
    }
  }

  candleStickOptions = {
    legend: 'none'
  }

  options :any = this.candleStickOptions;

  constructor(private finnhubService : FinnhubService, private dateTimeService : DateTimeService) {}

  ngOnInit(): void {
    this.getChartData();
  }

  setChartType() {
    if (this.chartType === 'candlestick') {
      this.type = ChartType.CandlestickChart;
      this.options = this.candleStickOptions;
    } else {
      this.type = ChartType.LineChart;
      this.options = this.lineOptions;
    }  }

  chartTypeChange = (childChartType: string): void => {
    this.chartType = childChartType;
    this.setChartType();
  }

  timeIntervalChange = (childTimeInterval: string): void => {
    this.assetTimeInterval = childTimeInterval;
    this.getChartData();
  }

  timescaleChange = (timescale: string): void => {
    this.chartTimescale = timescale;
    console.log("resolution " + this.chartTimescale);
    this.getChartData();
  }

  getChartData(scaleDate: number = 1) {
    this.chartData = [];

    // If we've gone back too many days and haven't found data
    if (scaleDate >= 5) {
      // alert("Too many calls to the finnhub api have been made. Try refreshing the page.");
      this.loadingGraph = false;
      return;
    }

    this.setChartType();

    let assetTime = this.dateTimeService.getTimeInterval(scaleDate, this.chartTimescale);
    this.loadingGraph = true;
    let fhd = this.finnhubService.getCandle(this.assetTicker, this.assetTimeInterval, assetTime.pastTime.toString(),
      assetTime.currentTime.toString());

    fhd.toPromise().then(data => {
      let acd = new assetCandle(data);

      // If there's no data, go back a day
      if (acd.status === 'no_data') {
        this.getChartData(++scaleDate);
        return;
      }

      let length = acd.close.length;

      // maps data to be in groups of 5: timestamp, low, open, closed, and high
      for (let i=0; i<length; i++) {
        let candlestick : Array<string | number> = [];
        let assetDate = new Date(acd.timestamp[i] * 1000);

        candlestick.push(assetDate.toISOString());
        candlestick.push(acd.low[i]);
        candlestick.push(acd.open[i]);
        candlestick.push(acd.close[i]);
        candlestick.push(acd.high[i]);

        this.chartData.push(candlestick);
        this.loadingGraph = false;
      }
      
    }).catch(error => this.loadingGraph = false);
  }
}
