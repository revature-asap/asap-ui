import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  
  private url:string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/posts";

  constructor(private http:HttpClient, private router:Router) { }

  getAllPosts():Observable<Post[]>{
    console.log("Made it: 1");
    return this.http.get<Post[]>(this.url);

  }

  newPost(title: string, content: string, tickerName: string):Observable<any>{

    //Todo: covert passed in tickerName into an asset Id.
    

    const httpOptions = {                                             
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    let addPost = {
      title: title,
      id: 0,
      authorId: 15,
      textContent: content,
      assetId: 1
      }

    let json = JSON.stringify(addPost);

      // formData.append("parentPostId", 1);
      // console.log("this is the form data: " + formData.getAll());
      // formData.append("assetId", `${post.assetId}`);
      // formData.append("userId", `${post.userId}`);


    return this.http.post<any>(this.url, json, httpOptions);

  }

  deletePost(){

  }

}
