import { Observable } from "rxjs";

export interface IAlertInfo {
    title: string,
    text: string,
    yesButtonText: string
}

export interface IConfirmationInfo {
    title: string,
    text: string,
    yesButtonText: string,
    cancelButtonText: string,
    yesFunction: () => Promise<void> | null;
}

export type AlertType = "alert" | "confirm";