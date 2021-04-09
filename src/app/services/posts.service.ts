import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


/**
 * Service class used to retrieve posts and replys. Also used to add new posts and replys.
 */
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  //this is our deployed server that we talk to
  private url:string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/posts";

  constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }

  /**
   * 
   * @returns returns a observable of posts with all parent post id -1. This is what we set 
   * as a post and not a reply
   */
  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.url + "/-1");

  }

  /**
   * Used to add a new post to the database with no parent Id.
   * @param title title
   * @param content text content
   * @param tickerName ticker name
   * @returns returns an observable post
   */
  newPost(title: string, content: string, tickerName: string):Observable<any>{

    let addPost = {};

    const httpOptions = {                                             
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.loginService.currentUser$.subscribe(
      u => {
        addPost = {
          title: title,
          id: 0,
          authorId: u?.id,
          textContent: content,
          assetId: 1
          }
      });

    let json = JSON.stringify(addPost);

    return this.http.post<any>(this.url, json, httpOptions);

  }

  /**
   * Creates a reply with the given params and add it to our database with a parent post id so
   * we know it's a reply and not a post
   * @param parentPostId parent post id
   * @param title title
   * @param content text content
   * @param tickerName ticker name
   * @returns returns an observable that shows the reply added
   */
  addReply(parentPostId: number, title: string, content: string, tickerName: string):Observable<any>{

    let addPost = {};

    const httpOptions = {                                             
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    this.loginService.currentUser$.subscribe(
      u => {
        addPost = {
          title: title,
          id: 0,
          authorId: u?.id,
          textContent: content,
          assetId: 1,
          parentPostId: parentPostId
          }
      });


    let json = JSON.stringify(addPost);

    return this.http.post<any>(this.url, json, httpOptions);

  }

  /**
   * Used to hit the api for getting all replys
   * @param parentPostId parent post id
   * @returns returns a array of posts
   */
  getReplys(parentPostId: number):Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/' + parentPostId);
  }

}
