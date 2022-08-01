import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
declare var $:any
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _AuthService:AuthService,private _Router:Router) { }

  responseMessage:string = ""
  isClicked:boolean = false;
  styleInValid = {'background-color':'gray','border':'gray'}
  styleValid = {'background-color':'#17a2b8','border':'#17a2b8'}
  signin = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]),
  })
  signinForm(form:FormGroup){
    this.isClicked = true;
    if(this.signin.valid){
      this._AuthService.signinApi(form.value).subscribe({
        next:(response)=>{
          if(response.message == "success"){
          this.responseMessage = response.message
            localStorage.setItem("token",response.token)
          
            this._AuthService.saveUserData()
            setTimeout(() => {
              this._Router.navigate(["/profile"])
            }, 1000);
          }else{
            this.isClicked = false;
            this.responseMessage = response.message
          }
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  }
  
  ngOnInit(): void {
    $('#signin').particleground();

  }

}