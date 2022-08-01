import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService:AuthService,private _Router:Router) { }
  isLogin:boolean = false;
  userInfo:any = {}
  signoutForm(){
    this._authService.signoutApi().subscribe({
      next:(response)=>{
       if(response.message == "success"){
        localStorage.removeItem("token")
        this._Router.navigate(["/signin"])
        this._authService.userData.next(null)
       }
      },
      error:(err)=>{  
      console.log(err)
      }
    })
  }
  ngOnInit(): void {
    this._authService.userData.subscribe({
      next:()=>{
          if(this._authService.userData.getValue() != null){
                this.isLogin = true
                this.userInfo = this._authService.userData
              }else{
                this.isLogin = false
              }
      },error:()=>{

      }
    })
    
  }

}
