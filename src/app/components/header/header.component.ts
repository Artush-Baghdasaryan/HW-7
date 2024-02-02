import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public userName: string | null = null;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  public logOut(): void {
    this.authService.logout();
  }

  public isAuthorized(): boolean {
    if (this.authService.isAuthorized()) {
      this.userName = this.authService.getUserName();
      return true;
    }
    return false;
  }

}
