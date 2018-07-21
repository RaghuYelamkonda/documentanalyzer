import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/User';


@Injectable()
export class UserService {

  user : User;

  constructor(private http: HttpClient) {}
  
    getUser(name: String) : Observable<User>{
      return this.http.get('/documentanalyzer/api/v1/user/'+name)
      .pipe(map(response => {
        this.user = <User>response;
        return <User>response
      }));
    }
    
    getLoggedInUser() : User {
      return this.user;
    }
}
