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
    this.postService.getAllPosts()
    this.postSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      this.posts = posts;
    });
  }

}
