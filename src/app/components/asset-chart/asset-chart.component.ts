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
  @Input() width = 1300;
  @Input() height = 700;
  @Input() chartType = 'candlestick'; // default for charts

  type : ChartType = ChartType.CandlestickChart;
  chartData : any[] = [];

  constructor(private finnhubService : FinnhubService) {}

  getFormattedDate(date: number, month: number,  year: number, 
    hour: number, minutes: number, seconds: number): string {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

    return months[month] + " " + date + " " + year + " " + 
        hours[hour % 12] + ":" + (minutes < 10 ? ("0" + minutes) : minutes) + ":" 
        + (seconds < 10 ? ("0" + seconds) : seconds)
        + (hour > 11 ? "pm" : "am"); 
  }
 
  ngOnInit(): void { 
    this.type = this.chartType === 'candlestick' ? ChartType.CandlestickChart : ChartType.BarChart;
    let fhd = this.finnhubService.getCandle("AAPL", "1", "1615298999", "1615333699");
    
    fhd.toPromise().then(data => {
      let acd = new assetCandle(data);
      let length = acd.close.length;
      console.log(acd);

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