import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../shared/service/upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(private router: Router, private fileUploadService : UploadService) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    this.fileUploadService.upload(this.files);
    this.router.navigateByUrl("dashboard");
  }

}
