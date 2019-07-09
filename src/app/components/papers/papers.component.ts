import { Component, OnInit } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';
import { FormControl } from '@angular/forms';
import { ConferenceService } from 'src/app/services/conference.service';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  papers:any;

  conference = new FormControl('', [

  ]);

  conferenceOptions:any;

  constructor(
    private paperService: PaperService,
    private conferenceService: ConferenceService
  ) { }

  ngOnInit() {
    this.getMyPapers();
    this.getConferences();
  }

  getMyPapers(){
    this.paperService.getPaperByAuthor()
    .subscribe(data => {
      if(data.success){

        this.papers = data.receivedPapers;

        console.log(data);
      }
    })
  }

  getConferences(){
    this.conferenceService.getAllConferences()
    .subscribe(data => {
      if(data.success){
        this.conferenceOptions = data.conference
      }
    })
  }

  addToConference(paper){
    let conf = {
      conferenceId: this.conference.value,
      paperId: paper._id,
      paperName: paper.papername
    }

    this.conferenceService.addToConference(conf)
    .subscribe(data => {
      if(data.success){
        console.log(data);
      }else{
        console.log(data)
      }
    })
  }

  deletePaper(paper){
    let conf = {
      id: paper._id,
    }

    this.conferenceService.deletePaper(conf)
    .subscribe(data => {
      if(data.success){
        console.log(data);
      }else{
        console.log(data)
      }
    })
  }

}
