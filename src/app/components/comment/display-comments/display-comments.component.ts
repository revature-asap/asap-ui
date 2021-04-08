import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
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
  loggedIn!: boolean;


  userProfile = {};

  user!: User;

  constructor(private postService: PostsService, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {

    this.postService.getAllPosts()
      .subscribe(p=> {
        this.posts = p;

        for(let i=0; i < this.posts.length; i++) {
          this.posts[i].showReply = false;

        }

      });

    this.loginService.currentUser$.subscribe(
      u => {
        if (u != null) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
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

  showReply(post: Post) {
    console.log("I am CLICKING! " + post.title + " " +post.showReply);
    if(post.showReply == true){
      post.showReply = false;
      return;
    }
    if(post.showReply == false){
      post.showReply = true;
      return;
    }
  }

}
