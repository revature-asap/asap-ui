import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { FinnhubService } from './finnhub.service';
import { assetQuote } from '../models/assetQuote.model';
import { assetProfile } from '../models/assetProfile';
import { assetCandle } from '../models/assetCandle';

fdescribe('FinnhubService', () => {
  let service: FinnhubService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FinnhubService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return an Asset Quote JSON',  () =>{




       //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
    let assetQ = {"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402};
    const quotes = new assetQuote(assetQ);
    const ticker = 'GME';
    //`${this.api_url + this.quoteUrl + ticker + this.token}`
    // let formatedURL = encodeURI(
    //   `${service.api_url + service.quoteUrl + ticker + service.token}`);

    let results = [{ param: 'symbol', value: 'GME' }, {param: 'token', value: 'c1ceppv48v6scqmqtk5g'}];
    //let url = `${service.api_url}/quote?${results[0].param}=${results[0].value}&${results[1].param}=${results[1].value}`;
    let url = service.api_url + service.quoteUrl + ticker + service.token;
    console.log(url);


    service.getQuote(ticker).subscribe((asseta)=>{});
//     let formatedURL = encodeURI(
//       `${service.api_url + service.quoteUrl + ticker + service.token}`);
// const req = httpTestingController.expectOne(
//       req => req.urlWithParams === formatedURL);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: quotes });
    req.event(expectedResponse);
  });

  fit('should return an Asset Profile JSON', () =>{
    //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
 let assetP = {"asset_id":1,"asset_name":'someAssetName',"ticker": 'SAN',"logo": 'myLogo.com',"market_cap":123,"share_outstanding":161, "industry_category": 'industryCategory', "website_url": 'https://www.myURL.com', "last_touched_timestamp": '2021-12-12'};
 const profiles = new assetProfile(assetP);
 const ticker = 'GME';
 //`${this.api_url + this.quoteUrl + ticker + this.token}`
 service.getProfile(ticker).subscribe((asseta)=>{});

 const req = httpTestingController.expectOne(`${service.api_url + service.profileUrl + ticker + service.token}`);
 expect(req.request.method).toEqual('GET');

 const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: profiles });
 req.event(expectedResponse);
});

fit('should return an Array Asset Candle JSON', () =>{
  //{"c":120.59,"h":121.66,"l":119,"o":119.54,"pc":120.09,"t":1616702402}
let assetC = {"o":[120.59, 222, 333, 444, 555],"h":[111,222,333,444],"l":[222,333,444,555],"c":[999,888,777,666,555],"v":[555,666,444,333],"t":[111,999,333,222,555], "s": "SomeString"};
const quotesC = new assetCandle();
quotesC.updateCandle(assetC);
const ticker = 'GME';
const resolution = 'D';
const start = '55555555555555555555555555555555';
const end = '999999999999999999999999999999999';

//`${this.api_url + this.quoteUrl + ticker + this.token}`
service.getCandle(ticker, resolution, start, end).subscribe((asseta)=>{});

const req = httpTestingController.expectOne(`${service.api_url + service.candleUrl + ticker + resolution + start + end + service.token}`);
expect(req.request.method).toEqual('GET');

const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: quotesC});
req.event(expectedResponse);
});
});
