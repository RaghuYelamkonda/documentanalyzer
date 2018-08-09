import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';
import { Subject, Observable } from 'rxjs';
import { AlertService } from 'src/app/shared/service/alert.service';
import { Alert } from 'src/app/shared/model/Alert';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { DocumentsService } from 'src/app/shared/service/documents.service';
import { Document } from 'src/app/shared/model/Document';

const fileServiceUrl = '/api/v1/fileuploaddownloader/';
const uploadUrl = fileServiceUrl + 'uploadFile';
const downloadUrl = fileServiceUrl + 'downloadFile';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient,
    private alertService: AlertService, private authenticationService: AuthenticationService, private documentsService: DocumentsService) { }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      var userID = this.authenticationService.getLoggedInUser().id;
      var updatedUrl = uploadUrl + '?userId=' + userID;
      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', updatedUrl, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();


      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          console.log("Adding success event");
          //this.documentsService.reloadDocuments();
          this.alertService.addAlert(new Alert('success', this.alertService.getNextID(), "Document uploaded successfully"));
          let documentFound: boolean= false;
          this.documentsService.documents.forEach(element => {
            if(element.name == file.name){
              documentFound = true;
            }
          });
          if(!documentFound){
            this.documentsService.addDocument(new Document(file.name, file.name, "", this.authenticationService.getLoggedInUser().id));
          }
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          //this.documentsService.reloadDocuments();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    // return the map of progress.observables
    return status;
  }

  public download(name: String) {
      return this.http.get<Blob>(downloadUrl + '/' + name, {responseType: 'blob' as 'json'})
      .subscribe(event => {
        if (event instanceof Blob) {
          saveAs(event, name);
        }
      });

      //, {headers: {"accepts":"application/octet-stream"}

      // return this.http.get<Blob>(downloadUrl + '/' + name, {responseType: 'blob' as 'json'})
      // .subscribe(event => {
      //   console.log(event);
      //   console.log("Event is "+ event);
      //   if (event instanceof Blob) {
      //     saveAs(event,"test.pdf");
      //   }
      // });
  }
}
