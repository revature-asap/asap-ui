import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbrCompDeetsComponent } from './abbr-comp-deets.component';

describe('AbbrCompDeetsComponent', () => {
  let component: AbbrCompDeetsComponent;
  let fixture: ComponentFixture<AbbrCompDeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbbrCompDeetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbbrCompDeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
