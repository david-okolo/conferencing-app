import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {

  conferences: Conference[] = [];
  selectedConference: Conference;

  constructor(
    private conferenceService:ConferenceService
  ) { }

  ngOnInit() {
    this.conferenceService.getAllConferences()
      .subscribe(data => {
      if(data.success){

        for( let pull of data.conference){
          let newConference:Conference = {
            _id: pull._id,
            conferencename: pull.conferencename,
            conferencechairId: pull.conferencechairId,
            conferencechairName: pull.conferencechairName,
            conferencePapers: pull.conferencePapers
          };

          this.conferences.push(newConference);
        }
      }
    });
  }

  getConference(conference){
    this.selectedConference = conference;
    console.log(this.selectedConference);
  }

}
