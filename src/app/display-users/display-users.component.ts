import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.css']
})
export class DisplayUsersComponent implements OnInit {

  url:string = "http://alwaslbeirutuos.eu-gb.mybluemix.net/getUsers";
  data : any;
  users:string[];

  constructor(private http: HttpClient) {
    this.http.get(this.url).toPromise().then( res => {
      if(res.hasOwnProperty('data')) {
        this.data = res;
        this.users = this.data.data;
        console.log(this.users)
      }
    })
   }

  ngOnInit(): void {
  }

}
