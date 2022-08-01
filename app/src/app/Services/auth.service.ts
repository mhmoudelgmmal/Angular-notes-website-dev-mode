import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient,private _Router:Router) { 
    if (localStorage.getItem("token") != null) {
      this.saveUserData()
    }
  } 
 
userData = new BehaviorSubject(null);


saveUserData(){
  let encodedToken:any = localStorage.getItem("token")
  let decodedToken:any = jwtDecode(encodedToken)
  this.userData.next(decodedToken)
}

 
  signupApi(form:any):Observable<any>{
    return this._HttpClient.post("https://routeegypt.herokuapp.com/signup",form)
  }
  signinApi(form:any):Observable<any>{
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signin',form)
  }
  signoutApi():Observable<any>{
   return this._HttpClient.post('https://routeegypt.herokuapp.com/signOut',localStorage.getItem("token"))
  }
}
