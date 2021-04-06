import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit {
  posts: Post[] = [];
  subscription: Subscription | undefined;
  assetTicker!: string; 

  userProfile = {};

  user!: User;

  constructor(private postService: PostsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Made it 2: ");
    this.postService.getAllPosts()
      .subscribe(p=> {
        this.posts = p;
      });

    this.subscription = this.route.data.subscribe(
      (data: Data) =>{
        console.log("im here: " + data)
        this.user = data['profile'];
        this.userProfile = {
          'background' : 'url(assets/images/default.png)',
          'background-repeat' : 'no-repeat',
          'width' : '5em',
          'height' : '5em',
          'background-size' : 'cover',
          'postion' : 'relative',
        };
      }
    )

  }

}