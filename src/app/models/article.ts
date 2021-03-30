export class Article{
  datetime: number;
  headline: string;
  image: string;
  summary: string;
  url: string;

  constructor(datetime: number, headline: string, image: string, summary: string, url: string) {
    this.datetime = datetime;
    this.headline = headline;
    this.image = image;
    this.summary = summary;
    this.url = url;
  }
}
