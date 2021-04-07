import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { LoginService } from 'src/app/services/login.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  submitted: Boolean = false;
  public id = 0; //??
  newPost!: Post;

  @Output() userComment = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private postService: PostsService, private loginService: LoginService,
    private router:Router) { }

  ngOnInit(): void {
    this.createForm;
  }

  createForm(){
    
  }

  onSubmit(form:NgForm){
    console.log("I need this for posting new post: " + form.value.postTitle);

    this.postService.newPost(
      form.value.postTitle,
      form.value.postContent,
      form.value.assetTicker,
      ).subscribe(post => {
        console.log("trying to console log post:" + post);
      });

      form.reset();

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['']);



  }

}
