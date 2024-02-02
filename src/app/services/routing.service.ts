import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private router: Router) { }

  public redirectToLogin(): void {
    this.router.navigate(["/login"]);
  }

  public redirectToRegister(): void {
    this.router.navigate(["/register"]);
  }

  public redirectToBooks(): void {
    this.router.navigate(["/books"]);
  }

  public redirectToHome(): void {
    this.router.navigate(["/home"]);
  }
}
