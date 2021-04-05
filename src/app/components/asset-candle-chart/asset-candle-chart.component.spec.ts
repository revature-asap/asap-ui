import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCandleChartComponent } from './asset-candle-chart.component';

describe('AssetCandleChartComponent', () => {
  let component: AssetCandleChartComponent;
  let fixture: ComponentFixture<AssetCandleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCandleChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCandleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
