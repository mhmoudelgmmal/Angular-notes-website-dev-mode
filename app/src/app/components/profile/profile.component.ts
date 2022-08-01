import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from './../../Services/notes.service';
import { AuthService } from './../../Services/auth.service';
import  jwtDecode  from 'jwt-decode';
import { FormGroup, FormControl } from '@angular/forms';
declare var $:any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _Router:Router,private _NotesService:NotesService,private _AuthService:AuthService) {}
  token:any
  decoded:any
 
  

  isLoad:boolean = false;
  allNotes:any;
    addNote = new FormGroup({
      title: new FormControl(),
      desc:new FormControl(),
    })

    EditNote = new FormGroup({
      title: new FormControl(),
      desc:new FormControl(),
    })

    getNotes(){
      
      let data = {
        token:this.token,
        userID:this.decoded._id
      }
      
      this._NotesService.getAllNotes(data).subscribe({
        next:(response)=>{
          if(response.message == "success" || response.message == "no notes found"){
            this.isLoad = true
            this.allNotes= response.Notes
            
          }else{
            localStorage.clear()
            this._Router.navigate(["/signin"])
            this._AuthService.userData.next(null)     
            
          }
          
          
        },error:(err)=>{
          console.log(err)
        }
      })
    }
    addData(){
    
      let theData={
        title:this.addNote.value.title,
        desc:this.addNote.value.desc,
        citizenID:this.decoded._id,
        token:this.token
      }
      this._NotesService.addNote(theData).subscribe({
        next:(response)=>{
          if(response.message == "success"){
            $("#modelId").modal('hide');
            this.getNotes()
            this.addNote.reset()
          }
        
          
        },error:(err)=>{
          console.log(err)
        }
      })
    }
    note_id:any;

    getId(id:any){
      this.note_id = id
    }
    deleteNote(){
      let data = {
        "NoteID": this.note_id,
        "token": this.token
      }
      this._NotesService.deleteNote(data).subscribe({
        next:(response)=>{
          if(response.message == "deleted"){
            $("#Delete").modal('hide');
            this.getNotes()
            
          }
        },error:(err)=>{
          console.log(err)
        }
      })
    }
    setValue(){
      for (let i = 0; i < this.allNotes.length; i++) {
       if(this.allNotes[i]._id == this.note_id){
        
        this.EditNote.controls.title.setValue(this.allNotes[i].title)
        this.EditNote.controls.desc.setValue(this.allNotes[i].desc)

       }
        
      }
    }
    editNote(){
      let data ={
        title:this.EditNote.value.title,
        desc:this.EditNote.value.desc,
        NoteID:this.note_id,
        token:this.token
      }
      
      this._NotesService.editNote(data).subscribe({
        next:(responese)=>{
          if(responese.message == "updated"){
            $("#Edit").modal('hide');
            this.getNotes()
            
          }
          
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  ngOnInit(): void {
    
    
    try{
    this.token= localStorage.getItem("token")
    this.decoded = jwtDecode(this.token)
    
    }catch(error)
    {
      localStorage.clear()
      this._Router.navigate(["/signin"])
    }
    this.getNotes()
    
  } 

}
