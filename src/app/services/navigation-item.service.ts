import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { INavigationItem } from '../interfaces/inavigation-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationItemService {

  constructor(private http: HttpClient) { }

  public getMailItems(): Observable<any> {
    return this.http.get("assets/navigationItems.json")
  }
}
