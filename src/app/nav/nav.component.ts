import { Component, OnInit } from '@angular/core';
import { INavigationItem } from '../interfaces/inavigation-item';
import { NavigationItemService } from '../services/navigation-item.service';
import { MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public mailItems: INavigationItem[] = [];
  public labelItems: INavigationItem[] = [];
  public activatedItemId: number = 1;

  constructor(public navigationService: NavigationItemService) {
  }

  public ngOnInit(): void {
    this.navigationService.getMailItems().subscribe((data: any) => {
      this.mailItems = data["mail"];
      this.labelItems = data["labels"];
    });
  }

  public onItemClick(item: INavigationItem): void {
    this.activatedItemId = item.id;
  }
}
