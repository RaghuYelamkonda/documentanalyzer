import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../shared/service/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(private fileUploadService: UploadService) { }

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
  }
}