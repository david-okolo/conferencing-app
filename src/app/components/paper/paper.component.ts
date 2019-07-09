import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PaperService } from 'src/app/services/paper.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss']
})
export class PaperComponent implements OnInit {

  name:string = "Quantum Physics";
  author:string = "Dr. Sonia";
  desc:string = "Lorem";
  id:string;
  comments:any;

  authorId:string;

  newComment = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private paperService: PaperService,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getPaper();
  }

  getPaper(){
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id)

    let paper = {
      id: id
    }
    this.paperService.getPaperById(paper)
    .subscribe(data => {
      if(data.success){
        this.name = data.recievedPaper.papername;
        this.authorId = data.recievedPaper.authorid;
        this.id = data.recievedPaper._id;
        this.comments = data.recievedPaper.comments;
        this.getAuthor();
        console.log(data);
      }else {
        console.log(data.msg);
      }
    })
  }

  getAuthor(){
    let user = {
      id: this.authorId
    }
    this.auth.getUser(user)
    .subscribe(data => {
      if(data.success){
        this.author = data._doc.name
      }else{
        console.log(data)
      }
    })
  }

  submitComment(){
    let comment = {
      comment: this.newComment.value,
      paperId: this.id
    }

    this.paperService.addComment(comment)
    .subscribe(data => {
      if(data.success){
        console.log(data)
      }else{
        console.log(data.msg)
      }
    });
  }

}
