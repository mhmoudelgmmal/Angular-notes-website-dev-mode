import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _HttpClient:HttpClient) { }
  
  getAllNotes(data:any):Observable<any>{
    return this._HttpClient.post("https://routeegypt.herokuapp.com/getUserNotes",data)
  }
  addNote(data:any):Observable<any>{
    return this._HttpClient.post("https://routeegypt.herokuapp.com/addNote",data)
  }
  deleteNote(data:any):Observable<any>{
    let options = {
      headers:new HttpHeaders({

      }),
      body:{
        "NoteID": data.NoteID,
        "token": data.token
      }
    }
    return this._HttpClient.delete("https://routeegypt.herokuapp.com/deleteNote",options)
  }


  
editNote(data:any):Observable<any>{
  return this._HttpClient.put("https://routeegypt.herokuapp.com/updateNote",data)
}



}
