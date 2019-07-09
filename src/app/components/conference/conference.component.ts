import { Component, OnInit } from '@angular/core';
import { PaperService } from 'src/app/services/paper.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConferenceService } from 'src/app/services/conference.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {
  id:string;
  name:string;
  author:string;
  papers:any;


  constructor(
    private conferenceService: ConferenceService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getConference();
  }

  getConference(){
    const id = this.route.snapshot.paramMap.get('id');

    console.log(id)

    let conference = {
      id: id
    }
    this.conferenceService.getConferenceById(conference)
    .subscribe(data => {
      if(data.success){
        this.name = data.conference.conferencename;
        this.author = data.conference.conferencechairName;
        this.id = data.conference._id;
        this.papers = data.conference.conferencePapers;

        console.log(data);
      }else {
        console.log(data.msg);
      }
    })
  }

}
