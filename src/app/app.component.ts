import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HW-7';
  public isNotAuthorized: boolean = false;

  constructor(public authService: AuthService, private router: ActivatedRoute) {}

  public ngOnInit(): void {
    this.isLoginPageOpen();
  }

  public isLoginPageOpen(): boolean {
    const currentHref = window.location.href
    return currentHref.includes("/login") || currentHref.includes("/register");
  }
}
