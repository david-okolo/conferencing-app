import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConferenceService } from 'src/app/services/conference.service';
import { AuthService } from 'src/app/services/auth.service';
import { PaperService } from 'src/app/services/paper.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profilename:string = "loading...";
  profileusername:string = "loading...";
  profilelevel:string = "loading...";
  

  //paper variables
  paper: File;
  papername = new FormControl('', [
    Validators.required
  ]);

  

  conferencename = new FormControl('', [
    Validators.required
  ])

  conferencedesc = new FormControl('')

  

  constructor(
    private conferenceService: ConferenceService,
    private auth: AuthService,
    private paperService: PaperService
  ) { }

  ngOnInit() {

    this.auth.getProfile()
    .subscribe(data => {
      if(data.success){
        localStorage.setItem('_id', data._doc.id);
        this.profilename = data._doc.name;
        this.profileusername = data._doc.username;
        this.profilelevel = data._doc.level;
      }
    })
    
  }

  loadFile(files: File[]){
    this.paper = files[0];
    console.log(this.paper)
  }

  uploadPaper(){
    let formdata:FormData = new FormData();
    formdata.append('paper', this.paper);
    formdata.append('papername', this.papername.value);
    formdata.append('_id', localStorage.getItem('_id'));
    console.log(formdata)

    this.paperService.uploadPaper(formdata)
    .subscribe(data => {
      if(data.success){
        console.log(data)
      }else{
        console.log(data)
      }
    })
  }

  submitConference(){
    let newConference = {
      conferencename: this.conferencename.value,
      conferencedesc: this.conferencedesc.value
    }

    this.conferenceService.startConference(newConference)
    .subscribe(data => {
      if(data.success){
        console.log(data.doc);
      }else {
        console.log(data.msg);
      }
    });
  }
  
}
