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
    //Finnhub is annoying
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let to = yyyy + '-' + mm + '-' + dd;

    let weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    let wad = String(weekAgo.getDate()).padStart(2, '0');
    let wam = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    let way = weekAgo.getFullYear();
    let from = way + '-' + wam + '-' + wad;

    try{
      this.articles = await this.newsService.stockNews('AAPL', from, to);
      console.log(this.articles);
    }catch (e){
      console.error(e);
    }
  }

  redirect(url: string){
    window.open(url, '_blank');
  }

  ngOnInit(): void {
  }

}
