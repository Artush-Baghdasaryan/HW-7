import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlertService } from '../alert.service';
import { AlertType, IAlertInfo, IConfirmationInfo } from 'src/app/interfaces/alert-data';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  public confirmationInfo: IConfirmationInfo | null = null;
  public alertInfo: IAlertInfo | null = null;

  @ViewChild("confirmationDialog") private confirmationDialogTemplate: TemplateRef<any> | null = null;
  @ViewChild("alertDialog") private alertDialogTemplate: TemplateRef<any> | null = null;

  constructor(private alertService: AlertService, public matDialog: MatDialog) {
    
  }

  public ngOnInit(): void {
    this.alertService.confirm.subscribe(confirmInfo => {
      this.confirmationInfo = confirmInfo as IConfirmationInfo;
      setTimeout(() => {
        this.openConfirmationDialog();
      })
    });

    this.alertService.alert.subscribe(alertInfo => {
      this.alertInfo = alertInfo;
      setTimeout(() => {
        this.openAlertDialog();
      })
    });    
  }

  public openConfirmationDialog(): void {
    const dialogRef = this.openDialog("confirm");
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.confirmationInfo?.yesFunction();
        return;
      }
    })
  }

  public openAlertDialog(): void {
    this.openDialog("alert");
  }

  public openDialog(alertType: AlertType): MatDialogRef<any, any> {
    const enterAnimationDuration = "0.3s";
    const exitAnimationDuration = "0.5s";

    const template = alertType === "alert" ? this.alertDialogTemplate : this.confirmationDialogTemplate;
    const dialogRef = this.matDialog.open(template!, {
      maxWidth: "700px",
      enterAnimationDuration,
      exitAnimationDuration
    });
    return dialogRef;
  }
}


