import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _AuthService:AuthService) { }
  
  responseMessage:string = ""
  isClicked:boolean = false;
  styleInValid = {'background-color':'gray','border':'gray'}
  styleValid = {'background-color':'#17a2b8','border':'#17a2b8'}

  signup = new FormGroup({
  first_name:new FormControl('',[Validators.required,Validators.pattern(/[a-zA-Z][a-zA-Z]{2,}/)]),
  last_name:new FormControl('',[Validators.required,Validators.pattern(/[a-zA-Z][a-zA-Z]{2,}/)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  age:new FormControl('',[Validators.required,Validators.min(16),Validators.max(65)]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)] )
})
signupForm(form:FormGroup){
  this.isClicked = true;
  if(form.valid){
   
   this._AuthService.signupApi(form.value).subscribe({
    next:(response)=>{
      if(response.message == "success"){
        this.isClicked = false;
        this.responseMessage = response.message
      }else{
         this.isClicked = false;
        this.responseMessage = response.message
      }
     
    },
    error:(err)=>{
      console.log(err)}
   })
  }
 
}
  ngOnInit(): void {
    $('#signup').particleground();
  }

}
