import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post.model';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit {
  posts: Post[] = [];

  private postSub!: Subscription;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    console.log("Made it 2: ");
    this.postService.getAllPosts().subscribe(p=>{this.posts = p;});
    console.log(this.posts[0]);
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      console.log("Made it 3: " + posts);
      this.posts = posts;
    });
  }

}
