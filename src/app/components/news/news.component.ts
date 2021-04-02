import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {Article} from "../../models/article";
import { PageEvent } from '@angular/material/paginator';

/**
 * This component is able to display all the news articles for a given
 * asset over the past week
 */
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  articles: Article[] = [];
  assets: string[] = ['AAPL', 'GME', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
  articlesTemp: Article[] = [];
  numElements = 0;
  currentIndex = 0;
  pageSizeNum = 4;

  constructor(private newsService: NewsService) { }

  /**
   * Fetches articles fora given stock symbol
   */
  fetchArticles = async () => {
    //Finnhub is annoying and requires that the date format have the 0 in front of the months and
    // days with one character
    let to = this.todayDate();
    let from = this.weekAgo(new Date());

    for (const asset of this.assets) {
      try{
        let allArticles: Article[] = await this.newsService.stockNews(asset, from, to);
        this.articles.push(allArticles[0]);
      }catch (e){
        console.error(e);
      }
    }
    this.articlesTemp = [];
    for (let i = 0; i < this.pageSizeNum; i++) {
      this.articlesTemp.push(this.articles[i]);
    }
    console.log("The length of the articles is " + this.articles.length);
  }

  /**
   * Gets the current date as a string yyyy-mm-dd
   */
  todayDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * Gets the date from a week ago as a string yyyy-mm-dd
   * @param today the current date
   */
  weekAgo(today: Date): string {
    let weekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    let dd = String(weekAgo.getDate()).padStart(2, '0');
    let mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = weekAgo.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  /**
   * Redirects the user to the target url
   * @param url the target url
   */
  redirect(url: string){
    window.open(url, '_blank');
  }

  /**
   * Allows for an array of ticker names to be passed to have their news
   * articles displayed
   * @param assets an array of ticker names
   */
  setAssets(assets: string[]): void {
    this.assets = assets;
  }

  /**
   * When the component is initialized, we will want to call the fetchArticles()
   * method in order to populate with the news articles in the class variable
   */
  ngOnInit(): void {
   this.fetchArticles();



  }

  onChangePage(pageData: PageEvent) {
    this.articlesTemp = [];

    this.numElements = 0;
    this.currentIndex = pageData.pageIndex * pageData.pageSize;

      while (this.numElements < pageData.pageSize && this.currentIndex < this.articles.length) {

        this.articlesTemp.push(this.articles[this.currentIndex]);
        this.numElements++;
        this.currentIndex++;
      }
    console.log(pageData);
  }

}
