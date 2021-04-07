import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  private user!: User;
  
  private url:string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/posts";

  constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }

  getAllPosts():Observable<Post[]>{
    console.log("Made it: 1");
    return this.http.get<Post[]>(this.url + "/-1");

  }

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

  getReplys(parentPostId: number):Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/' + parentPostId);
  }

  deletePost(){

  }


}
