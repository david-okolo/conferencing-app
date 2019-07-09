import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name = new FormControl('', [
    Validators.required
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(10)
  ])

  accountType = new FormControl('',[
    Validators.required
  ])

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getNameErrorMessage() {
    if(this.name.errors.required){
      return 'You must enter a value';
    }
  }

  getEmailErrorMessage() {
    if(this.email.errors.required){
      return 'You must enter a value';
    } else if(this.email.errors.email){
      return 'Invalid Email';
    }
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

  submitUser(){
    let newUser:any = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
      authLevel: this.accountType.value
    };

    if(this.name.valid && this.email.valid && this.username.valid && this.password.valid && this.accountType.valid){
      this.authService.registerUser(newUser).subscribe(data => {
        if(data.success){
          this.router.navigate(['/login']);
          console.log(data);
        }else{
          console.log(data.msg)
        }
      })
    }else {
      console.log('invalid')
    }
  }
}
