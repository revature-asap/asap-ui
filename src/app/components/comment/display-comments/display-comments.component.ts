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
  loggedIn!: boolean;

  userProfile = {};
  user!: User;

  constructor(private postService: PostsService, private route: ActivatedRoute, private loginService: LoginService) { }

  /**
   * Displays all the posts and set their showReply intially to false. Also checks if the user
   * is log in so that they can see a reply box if they click post. This also gets the current user
   * information.
   */
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

  /**
   * shows/unshows the reply box if a user clicks on a post
   */
  showReply(post: Post) {

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
