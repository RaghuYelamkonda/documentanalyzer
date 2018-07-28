import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/shared/model/Alert';

@Injectable()
export class AlertService {
    public alerts: Array<Alert> = [];
    private id : number = 0;

    public addAlert(alert: Alert) {
        this.alerts.push(alert);
    }

    public getAlerts() : Array<Alert> {
        return this.alerts;
    }

    public closeAlert(alert: Alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    public getNextID() : number {
        return ++this.id;
    }
}
