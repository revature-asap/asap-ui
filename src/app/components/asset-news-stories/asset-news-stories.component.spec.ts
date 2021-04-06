import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetNewsStoriesComponent } from './asset-news-stories.component';

describe('AssetNewsStoriesComponent', () => {
  let component: AssetNewsStoriesComponent;
  let fixture: ComponentFixture<AssetNewsStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetNewsStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetNewsStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
