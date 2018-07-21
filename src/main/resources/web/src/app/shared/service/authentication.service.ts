import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from 'src/app/shared/model/User';

@Injectable()
export class AuthenticationService {
    user : User;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`/documentanalyzer/api/v1/login/`, { "userName": username, "password": password })
        .pipe(map(user => {
            this.user = <User>user;
            return user;
        }));
}

getLoggedInUser() : User {
    return this.user;
  }

logout() {
  return this.http.post<any>(`/documentanalyzer/api/v1/logout/`, {  })
  .pipe(map(user => {
      this.user = null;
      return user;
  }));
}
}
