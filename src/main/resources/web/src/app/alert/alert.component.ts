import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/service/alert.service';
import { Alert } from 'src/app/shared/model/Alert';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    constructor(private alertService: AlertService) { 
    }

    public getAlerts() : Array<Alert> {
        return this.alertService.getAlerts();
    }

    public closeAlert(alert: Alert) {
        this.alertService.closeAlert(alert);
    }
}