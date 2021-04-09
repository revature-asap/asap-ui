import {Component, OnInit, ViewChild} from '@angular/core';
import {Article} from "../../models/article";
import {NewsService} from "../../services/news.service";
import {LoginService} from "../../services/login.service";
import {WatchListService} from "../../services/watch-list.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";

/**
 * This component is for showing the news stories for a specific
 * asset on the asset display page, which is only two articles
 * for each page in the paginator
 */
@Component({
  selector: 'app-asset-news-stories',
  templateUrl: './asset-news-stories.component.html',
  styleUrls: ['./asset-news-stories.component.css']
})
export class AssetNewsStoriesComponent implements OnInit {

  articles: Article[] = [];
  articlesTemp: Article[] = [];
  numElements = 0;
  currentIndex = 0;
  pageSizeNum = 2;

  constructor(private newsService: NewsService, private router: ActivatedRoute) { }

  /**
   * Grabs the ticker upon initialization
   */
  ngOnInit(): void {
    let assetName: string;
    assetName = this.router.snapshot.paramMap.get("tickerId") || '{}';
    this.fetchArticles(assetName).then();
  }

  /**
   * Fetches articles fora given stock symbol
   */
  fetchArticles = async (assetName:string) => {
    this.articles = [];
    let to = this.todayDate();
    let from = this.weekAgo(new Date());

    try{
      let allArticles: Article[] = await this.newsService.stockNews(assetName, from, to);
      for(let i = 0; i < allArticles.length; i++){
        if(i > 11){
          break;
        }
        this.articles.push(allArticles[i]);
      }
    }catch (e){
      console.error(e);
    }

    this.articlesTemp = [];
    for (let i = 0; i < this.pageSizeNum; i++) {
      this.articlesTemp.push(this.articles[i]);
    }
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
   * Changes the page in the paginator
   * @param pageData the data for what page the paginator is on
   */
  onChangePage(pageData: PageEvent) {
    this.articlesTemp = [];

    this.numElements = 0;
    this.currentIndex = pageData.pageIndex * pageData.pageSize;

    while (this.numElements < pageData.pageSize && this.currentIndex < this.articles.length) {

      this.articlesTemp.push(this.articles[this.currentIndex]);
      this.numElements++;
      this.currentIndex++;
    }
  }

}
