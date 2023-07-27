import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsDbService {

  constructor(
    public http: HttpClient
  ) {}

  getContacts(){
    // do any sorting at server to reduce coding 
    return this.http.get<[]>('http://localhost:3000/contacts?_sort=name')
  }

  getFilteredList(searchQuery:string){
    // return list on keydown
    return this.http.get<[]>('http://localhost:3000/contacts?name_like='+searchQuery+'&sort=name&_order=asc');
  }

  deleteContact(contactID:string){
    return this.http.delete('http://localhost:3000/contacts/'+contactID).subscribe(data=>{
      console.log(data + "deleted user with id "+contactID);
    }, err=>{
      alert(err.message);
    })
  }

  addContact(contact:{'name':string,'phone':string}){
    return this.http.post<any>('http://localhost:3000/contacts',contact).subscribe(data=>{
      // console.log( data)
    },err=>{
      alert(err.message)
    })
  }
  editContact(contact:{'name':string,'phone':string,'id':string}){
    // return this.http.put()
    return this.http.post<any>('http://localhost:3000/contacts/'+contact.id,contact).subscribe(data=>{
      // console.log( data)
    },err=>{
      alert(err.message)
    })
  }
}
