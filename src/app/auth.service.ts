import { Injectable } from '@angular/core';
import {User} from './_helper/Users.model'
import { HttpService }  from './http.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService:HttpService) { }

  public async signIn(userData: User){
    
    localStorage.setItem('ACCESS_TOKEN', userData.type);
    
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }
  public logout(){
    localStorage.removeItem('NGOID');
    localStorage.removeItem('NGONAME')
    localStorage.removeItem('NGOKEY')
        
    localStorage.removeItem('ACCESS_TOKEN');
  }
}
