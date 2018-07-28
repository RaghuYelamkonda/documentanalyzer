import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/shared/service/alert.service';
import { Alert } from 'src/app/shared/model/Alert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  onLogout() {

    this.authenticationService.logout().subscribe(
      data => {
        this.router.navigate(['/']);
        //this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.addAlert(new Alert('danger', this.alertService.getNextID(), error));
      });
  }

}
