import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinnhubService } from 'src/app/services/finnhub.service';
import { TickerService } from 'src/app/services/ticker.service';

import { TickerContainerComponent } from './ticker-container.component';

describe('TickerContainerComponent', () => {
  let component: TickerContainerComponent;
  let fixture: ComponentFixture<TickerContainerComponent>;
  let finnhubSpy: jasmine.SpyObj<FinnhubService>;
  let tickerSpy: jasmine.SpyObj<TickerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
