import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule, MatDividerModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, MatIconModule } from "@angular/material";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth.service';
import { ConferenceService } from './services/conference.service';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaperComponent } from './components/paper/paper.component';
import { PaperService } from './services/paper.service';
import { PapersComponent } from './components/papers/papers.component';
import { ConferenceComponent } from './components/conference/conference.component';


 const routes : Routes = [
   {path: "conferences", component: ConferencesComponent},
   {path: "conference/:id", component: ConferenceComponent},
   {path: "login", component: LoginComponent},
   {path: "register", component: RegisterComponent},
   {path: "profile", component: ProfileComponent},
   {path: "paper/:id", component: PaperComponent},
   {path: "papers", component: PapersComponent}
 ]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConferencesComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PaperComponent,
    PapersComponent,
    ConferenceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    ConferenceService,
    PaperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
