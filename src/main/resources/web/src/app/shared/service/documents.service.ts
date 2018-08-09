import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Document } from 'src/app/shared/model/Document';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { User } from 'src/app/shared/model/User';

@Injectable()
export class DocumentsService {
  addDocument(document: Document): any {
    this.documents.push(document);
  }
    documents: Document[];

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    getDocuments() {
        var user: User = this.authenticationService.getLoggedInUser();
        if(user) {
            console.log("Hitting url "+ `/api/v1/document/`+user.id)
            return this.http.get<any>(`/api/v1/document/`+user.id)
            .pipe(map(documents => {
                this.documents = <Document[]>documents;
                return documents;
            }));
        }
    }

    reloadDocuments() {
        var user: User = this.authenticationService.getLoggedInUser();
        if(user) {
            this.documents.length=0;
            console.log("Hitting url "+ `/api/v1/document/`+user.id)
            return this.http.get<any>(`/api/v1/document/`+user.id)
            .pipe(map(docs => {
                console.log(docs);
                docs.forEach(element => {
                    this.documents.push(element);
                });
            }));
        }
    }

    refreshDocuments() {
        this.documents.length = 0;
        this.getDocuments();
    }
}