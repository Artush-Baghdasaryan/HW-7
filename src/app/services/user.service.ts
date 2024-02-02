import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { LoginDto, RegisterDto, TokenDto } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
}
