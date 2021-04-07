import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-reply-box[post]',
  templateUrl: './reply-box.component.html',
  styleUrls: ['./reply-box.component.css']
})
export class ReplyBoxComponent implements OnInit {

  constructor(private postService: PostsService) { }
  @Input() post!:Post;
  parentPostId!: number;

  ngOnInit(): void {
    console.log("This is the specific parentPost inside post id: " + this.post.postId)
    this.parentPostId = this.post.postId;
    console.log("This is the specific parentPost inside parentpost: " + this.parentPostId)
  }

  onReply(form:NgForm) {
    console.log("replying");
    console.log("in the onReply before adding: " + this.parentPostId);
    this.postService.addReply(
      this.parentPostId,
      this.post.title,
      form.value.postContent,
      this.post.assetTicker
      ).subscribe(post => {
        console.log("trying to console log post:" + post);
      });
  }

}
