import { Component, AfterViewInit, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

  
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0; //??
  
  @Output() userComment = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm;
  }

  createForm(){
    
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    // this.submitted = true;
    //If form is invalid:
    // if (this.commentForm.invalid){
    //   return;
    // }else{
    //   this.commentInfo.push({
    //     currentDate: new Date(), 
    //     commentTxt: this.commentForm.controls['comment'].value,
    //     replyComment: []
    //   });
    //   this.userComment.emit(this.commentInfo);
    // }
  }

}
