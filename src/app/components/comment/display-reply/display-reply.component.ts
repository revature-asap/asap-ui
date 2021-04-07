import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-display-reply[post]',
  templateUrl: './display-reply.component.html',
  styleUrls: ['./display-reply.component.css']
})
export class DisplayReplyComponent implements OnInit {
  @Input() post!: Post;
  replys: Post[] = [];

  user!: User;

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.postService.getReplys(this.post.id).subscribe(replys => {
        this.replys = replys;
    })
  }

  

}
