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

  
  private url:string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/posts";

  constructor(private http:HttpClient, private router:Router, private loginService:LoginService) { }

  getAllPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.url + "/-1");

  }

  newPost(title: string, content: string, tickerName: string):Observable<any>{

    let addPost = {};

    const httpOptions = {                                             
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    console.log("Im in newpost before loginservice"+addPost);  
    this.loginService.currentUser$.subscribe(
      u => {
        addPost = {
          title: title,
          id: 0,
          authorId: u?.id,
          textContent: content,
          assetId: 1
          }
          console.log("Im in newpost inside loginservice"+addPost);  
      });

    console.log("Im in newpost after loginservice"+addPost);  
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

    console.log("Im in newreply before loginservice"+JSON.stringify(addPost));  
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
          console.log("Im in newreply inside loginservice"+ JSON.stringify(addPost));  
      });

      console.log("Im in newreply after loginservice"+JSON.stringify(addPost));  

    let json = JSON.stringify(addPost);

    return this.http.post<any>(this.url, json, httpOptions);

  }

  getReplys(parentPostId: number):Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/' + parentPostId);
  }

  deletePost(){

  }


}
