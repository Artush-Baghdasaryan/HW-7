import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formGroup: FormBuilder,
    private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public get passwordControl() {
    return this.loginForm.controls['password'];
  }

  public get emailControl() {
    return this.loginForm.controls['email'];
  }

  public onSubmit() {
    console.log("on submite");
    const loginDto: LoginDto = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value
    }

    this.authService.login(loginDto).subscribe({
      next: (response) => {
        console.log("Loged in successfully", response);
      },
      error: (error) => {
        console.log("error!!!!!!!!!!!!!!!!!!!!!!!!", error);
      }
    });
  }

}