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
    this.parentPostId = this.post.id;
  }

  onReply(form:NgForm) {
    console.log("replying");

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
