import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayReplyComponent } from './display-reply.component';

describe('DisplayReplyComponent', () => {
  let component: DisplayReplyComponent;
  let fixture: ComponentFixture<DisplayReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
