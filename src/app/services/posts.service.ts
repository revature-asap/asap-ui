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
  
  private url:string = "http://localhost:5000/posts";

  constructor(private http:HttpClient, private router:Router) { }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  getAllPosts(){
    console.log("Made it: 1");
    
    return this.http.get<{ message: string; posts: any }>(this.url).pipe(map((postData: any) => {
        console.log("Made it: 2");
        return postData.posts.map((post:any) => {
          return {id: post.id, userId: post.authorId, content: post.textContent,
                  title: post.title, assetId: post.assetId}
        })
    })).subscribe(transformPosts => {
      this.posts = transformPosts;
      this.postUpdated.next([...this.posts]);
    });
  }

  newPost(){

  }

  deletePost(){

  }

}
