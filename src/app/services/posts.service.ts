import { Injectable } from '@angular/core';
import { Post } from '../models/Post.model';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
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

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  getAllPosts(){
    console.log("Made it: 1");
    return this.http.get<Post[]>(this.url);

  }

  newPost(){

  }

  deletePost(){

  }

}
