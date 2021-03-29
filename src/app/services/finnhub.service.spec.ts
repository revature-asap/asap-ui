import { TestBed } from '@angular/core/testing';

import { FinnhubService } from './finnhub.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FinnhubService', () => {
  let service: FinnhubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FinnhubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
