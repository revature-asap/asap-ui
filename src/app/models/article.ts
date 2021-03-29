export class Article{
  summary: string;
  author: string;
  link: string;
  title: string;
  published_date: string;

  constructor(summary: string, author: string, link: string, title: string, published_date: string) {
    this.summary = summary;
    this.author = author;
    this.link = link;
    this.title = title;
    this.published_date = published_date;
  }
}
