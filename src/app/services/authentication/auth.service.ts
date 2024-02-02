import { Injectable } from '@angular/core';
import { LoginDto, RegisterDto, TokenDto } from '../../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../app.config';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RoutingService } from '../routing.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userName: string = ""
  private prefix = "auth";
  private api = this.appConfig.apiUrl;
  private tokenKey = "authToken";
  private userNameKey = "userName";

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private routingService: RoutingService,
    private userService: UserService) { }

  public login(loginDto: LoginDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.api}/${this.prefix}/login`, JSON.stringify(loginDto)).pipe(
      tap({
        next: result => {
          this.saveToken(result.accessToken);
          this.saveUserName(result.accessToken);
          this.routingService.redirectToHome();
        },
        error: _ => {
          // to do
        }
      })
    );
  }

  public logout(): void {
    this.removeToken();
    this.routingService.redirectToLogin();
  }

  public register(registerDto: RegisterDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.api}/${this.prefix}/register`, registerDto).pipe(
      tap({
        next: result => {
          this.routingService.redirectToLogin();
        },
        error: _ => {
          console.log("error while registering", _);
        }
      })
    );
  }

  private saveUserName(token: string): void {
    let payload = token.split(".")[1];
    let authDataString = atob(payload);
    let authData = JSON.parse(authDataString);
    const name = `${authData.name} <${authData.email}>`;
    window.localStorage.setItem(`${this.userNameKey}`, name);
  }

  public isAuthorized(): boolean {
    return !!this.getToken();
  }

  public saveToken(token: string): void {
    window.localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(this.tokenKey);
  }

  public getUserName(): string | null {
    return window.localStorage.getItem(this.userNameKey);
  }

  public removeToken(): void {
    window.localStorage.removeItem(this.tokenKey);
  }
}
