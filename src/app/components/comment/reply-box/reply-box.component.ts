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

  ngOnInit(): void {
    
  }

  onReply(form:NgForm) {
    console.log("replying");

    this.postService.getReplys(1);
  }

}
