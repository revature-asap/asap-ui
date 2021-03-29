import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: any[] = [];

  constructor(private newsService: NewsService) { }

  fetchArticles = async () => {

    try{
      this.articles = await this.newsService.stockNews();
    }catch (e){
      console.error(e);
    }
  }

  ngOnInit(): void {
  }

}
