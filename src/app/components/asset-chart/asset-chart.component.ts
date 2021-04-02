import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { assetCandle } from 'src/app/models/assetCandle';
import { FinnhubService } from '../../services/finnhub.service';

@Component({
  selector: 'asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.css']
})
export class AssetChartComponent implements OnInit {
  @Input() chartTitle = 'Asset Chart';
  @Input() width = 1700;
  @Input() height = 400;
  @Input() chartType = 'candlestick'; // default for charts

  type : ChartType = ChartType.CandlestickChart;
  chartData : any[] = [];

  constructor(private finnhubService : FinnhubService) {}

  setChartType() {
    this.type = this.chartType === 'candlestick' ? ChartType.CandlestickChart : ChartType.LineChart;
  }

  getFormattedDate(date: number, month: number,  year: number, 
    hour: number, minutes: number, seconds: number): string {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    return months[month] + " " + date + " " + year + " " + 
        hours[hour % 12] + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":" 
        + (seconds < 10 ? ("0" + seconds) : seconds)
        + (hour > 11 ? "pm" : "am"); 
  }

  chartTypeChange = (childChartType: string): void => {
    this.chartType = childChartType;
    this.setChartType();
  }

  chartTimeInterval(timespan: string = '5m', scaleDate: number = 1): any {
    let ct = Math.floor(Date.now() / 1000 - 86400) * scaleDate;

    switch(timespan) {
      case '5m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 5)
        }
      case '15m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 15)
        }
      case '30m':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 30)
        }
      case '1h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60)
        }
      case '4h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 4)
        }
      case '6h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 6)
        }
      case '12h':
        return {
          currentTime: ct,
          pastTime: ct - (60 * 60 * 12)
        }
      case '1d':
        return {
            currentTime: ct,
            pastTime: ct - (60 * 60 * 24)
        }
    }
  }
 
  ngOnInit(): void { 
    this.getChartData();
  }

  getChartData(scaleDate: number = 1) {
    if (scaleDate >= 15) {
      console.log("Too many calls to the finnhub api have been made.");
      alert("Too many calls to the finnhub api have been made. Try refreshing the page.");
      return;
    }

    this.setChartType();
    let assetTime = this.chartTimeInterval('4h', scaleDate);
    console.log(assetTime);
    let fhd = this.finnhubService.getCandle("AAPL", "1", assetTime.pastTime.toString(), assetTime.currentTime.toString());

    fhd.toPromise().then(data => {
      let acd = new assetCandle(data);

      if (acd.status === 'no_data') {
        console.log('in no data section');
        this.getChartData(++scaleDate);
        return;
      }

      let length = acd.close.length;
      console.log(acd);
//
      for (let i=0; i<length; i++) {
        let candlestick : Array<string | number> = [];
        let assetDate = new Date(acd.timestamp[i] * 1000);

        candlestick.push(this.getFormattedDate(
          assetDate.getDate(), 
          assetDate.getMonth(), 
          assetDate.getFullYear(),
          assetDate.getHours(),
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
      }
    });
  }
}