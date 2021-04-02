import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  commentForm!: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0; //??
  
  @Output() userComment = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm;
  }

  createForm(){
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  submit(){
    this.submitted = true;
    //If form is invalid:
    if (this.commentForm.invalid){
      return;
    }else{
      this.commentInfo.push({
        commentId : this.id++, 
        currentDate: new Date(), 
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: []
      });
      this.userComment.emit(this.commentInfo);
    }
  }

}
