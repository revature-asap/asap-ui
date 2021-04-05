import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetChartOptionsComponent } from './asset-chart-options.component';

describe('AssetChartOptionsComponent', () => {
  let component: AssetChartOptionsComponent;
  let fixture: ComponentFixture<AssetChartOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetChartOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetChartOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
