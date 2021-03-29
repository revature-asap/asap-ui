import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDisplayComponent } from './asset-display.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AssetDisplayComponent', () => {
  let component: AssetDisplayComponent;
  let fixture: ComponentFixture<AssetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetDisplayComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
