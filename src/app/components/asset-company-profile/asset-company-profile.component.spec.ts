import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCompanyProfileComponent } from './asset-company-profile.component';

describe('AssetCompanyProfileComponent', () => {
  let component: AssetCompanyProfileComponent;
  let fixture: ComponentFixture<AssetCompanyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCompanyProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCompanyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
