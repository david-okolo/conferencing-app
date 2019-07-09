import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() createdToken= new EventEmitter();

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(10)
  ]);

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getPasswordErrorMessage() {
    if(this.password.errors.required){
      return 'You must enter a value';
    } else if(this.password.errors.minlength.actualLength < this.password.errors.minlength.requiredLength){
      return 'Too short';
    }
  }

  getUsernameErrorMessage() {
    if(this.username.errors.required){
      return 'You must enter a value';
    } else if(this.username.errors.minlength.actualLength < this.username.errors.minlength.requiredLength){
      return 'Too short';
    }
  }

  signUser(){
    let User:any = {
      password: this.password.value,
      username: this.username.value
    };

    if(this.username.valid && this.password.valid){
      this.authService.signUser(User).subscribe(data => {
        if(data.success){
          this.createdToken.emit(data.token);
          localStorage.setItem('token', data.token);
          this.authService.loadToken();
          if(this.authService.token){
            this.router.navigate(['/profile']);
          }

        }else{
          console.log(data.msg);
        }
      })
    }else {
      console.log('invalid')
    }
  }

}
