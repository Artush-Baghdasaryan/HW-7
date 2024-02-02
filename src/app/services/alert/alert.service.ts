import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlertInfo, IConfirmationInfo } from 'src/app/interfaces/alert-data';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public confirm = new Subject<IConfirmationInfo>();
  public alert = new Subject<IAlertInfo>();

  constructor() { }

  public showAlert(alertInfo: IAlertInfo): void {
    this.alert.next(alertInfo);
  }

  public showConfirmation(confirmInfo: IConfirmationInfo): void {
    this.confirm.next(confirmInfo);
  }
  
}
