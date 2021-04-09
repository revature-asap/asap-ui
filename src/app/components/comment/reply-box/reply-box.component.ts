import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-reply-box[post]',
  templateUrl: './reply-box.component.html',
  styleUrls: ['./reply-box.component.css']
})
export class ReplyBoxComponent implements OnInit {

  constructor(private postService: PostsService, private router: Router) { }
  @Input() post!:Post;
  parentPostId!: number;

  ngOnInit(): void {

    this.parentPostId = this.post.postId;

  }

  /**
   * Adds a reply and set the parent post id of the reply.
   * @param form reply form
   */
  onReply(form:NgForm) {

    this.postService.addReply(
      this.parentPostId,
      this.post.title,
      form.value.postContent,
      this.post.assetTicker
      ).subscribe(post => {
      });

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['']);
  }

}
