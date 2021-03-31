import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";

describe('NewsService', () => {
  let service: NewsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a status okay for a good request', () => {
    const token = '&token=c1hlcvn48v6q1s3o3v10';
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let to = yyyy + '-' + mm + '-' + dd;

    let weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    let wad = String(weekAgo.getDate()).padStart(2, '0');
    let wam = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    let way = weekAgo.getFullYear();
    let from = way + '-' + wam + '-' + wad;

    let stockSymbol = 'AAPL';

    service.stockNews(stockSymbol, from, to);

    const req = httpTestingController.expectOne(service.newsURL+'symbol='+stockSymbol+'&from='+from+'&to='+to+token);
    expect(req.request.method).toEqual('GET');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: [] });
    req.event(expectedResponse);
  });

  it('should return a status bad request for a bad request', () => {
    const token = '&token=c1hlcvn48v6q1s3o3v10';
    let today = new Date();
    let weekAgo = new Date(today.getMilliseconds()-(7*24*60*60*1000));

    let from = weekAgo.toString();
    let to = today.toString();

    let stockSymbol = 'AAPL';

    service.stockNews(stockSymbol, from, to);

    const req = httpTestingController.expectOne(service.newsURL+'symbol='+stockSymbol+'&from='+from+'&to='+to+token);
    expect(req.request.method).toEqual('GET');

    const expectedResponse = new HttpResponse({ status: 400, statusText: 'Bad Request'});
    req.event(expectedResponse);
  });
});
