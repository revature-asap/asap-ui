import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-display-reply[post]',
  templateUrl: './display-reply.component.html',
  styleUrls: ['./display-reply.component.css']
})
export class DisplayReplyComponent implements OnInit {
  @Input() post!: Post;
  replys: Post[] = [];


  constructor(private postService: PostsService) { }

  ngOnInit(): void {

    this.postService.getReplys(this.post.postId).subscribe(replys => {
        console.log(this.post.timeStamp);
        this.replys = replys;
    })
  }


  

}
