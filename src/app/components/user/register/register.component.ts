import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public get passwordControl() {
    return this.registerForm.controls['password'];
  }

  public get emailControl() {
    return this.registerForm.controls['email'];
  }

  public get nameControl() {
    return this.registerForm.controls['name'];
  }

  public onSubmit() {
    console.log("on submite");
    const registerDto: RegisterDto = {
      name:this.registerForm.get("name")?.value,
      email: this.registerForm.get("email")?.value,
      password: this.registerForm.get("password")?.value
    }

    this.authService.register(registerDto).subscribe({
      next: (response) => {
        this.alertService.showAlert({
          title: "Registration",
          text: "You have been successfully registered!",
          yesButtonText: "Ok"
        });
      },
      error: (error) => {
        console.log("error!!!!!!!!!!!!!!!!!!!!!!!!", error);
      }
    });
  }
}
