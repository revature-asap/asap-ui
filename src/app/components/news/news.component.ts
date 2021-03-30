import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {Article} from "../../models/article";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  fetchArticles = async () => {
    //Finnhub is annoying and requires that the date format have the 0 in front of the months and
    // days with one character
    let to = this.todayDate();
    let from = this.weekAgo(new Date());
    let stockSymbol = 'AAPL';

    try{
      this.articles = await this.newsService.stockNews(stockSymbol, from, to);
      console.log(this.articles);
    }catch (e){
      console.error(e);
    }
  }

  todayDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  weekAgo(today: Date): string {
    let weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    let dd = String(weekAgo.getDate()).padStart(2, '0');
    let mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = weekAgo.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }


  redirect(url: string){
    window.open(url, '_blank');
  }

  ngOnInit(): void {
  }

}
