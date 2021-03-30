import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsComponent } from './news.component';
import {NewsService} from "../../services/news.service";
import {ReactiveFormsModule} from "@angular/forms";

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let newsServiceSpy: jasmine.SpyObj<NewsService>;

  beforeEach(async () => {
    const spyA = jasmine.createSpyObj('NewsService', ['stockNews', 'redirect']);

    await TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      providers: [
        {provide: NewsService, useValue: spyA}
      ]
    })
    .compileComponents();

    newsServiceSpy = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current date as a string', () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    expect(component.todayDate).toEqual(yyyy + '-' + mm + '-' + dd);
  });

  it('should return week ago time as a string', () => {
    let today = new Date();
    let weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    let dd = String(weekAgo.getDate()).padStart(2, '0');
    let mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = weekAgo.getFullYear();
    expect(component.weekAgo(new Date())).toEqual(yyyy + '-' + mm + '-' + dd);
  })
});
