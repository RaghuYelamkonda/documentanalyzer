import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../shared/service/upload.service';
import { DocumentsService } from 'src/app/shared/service/documents.service';
import { Document } from 'src/app/shared/model/document';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  documents: Document[];
  @ViewChild('file') file;
  public files: Set<File> = new Set();

  constructor(private fileUploadService: UploadService, private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documentsService.getDocuments().subscribe(
      documents => this.documents = documents
    );
  }

  getDocuments() {
    return this.documents;
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  exportData() {
    for (let document of this.documents) {
      if(document.selected) {
        this.fileUploadService.download(document.name);
      }
    }

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