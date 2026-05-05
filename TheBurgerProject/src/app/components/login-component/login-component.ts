import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/DataAccess/auth-service';
import { Router } from '@angular/router';

interface TheLogInForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginFail = false;
  loading = false;

  theForm = this._formBuilder.group<TheLogInForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email
    ]),
    password: this._formBuilder.control(null, [Validators.required])
  });

  async atemptLogIn() {
    if (this.theForm.invalid) return;
    
    try {
      this.loading = true;
      const { error } = await this._authService.logIn({
        email: this.theForm.value.email ?? '',
        password: this.theForm.value.password ?? ''
      });

      if (error) throw error;
      this.loading = false;
      this._router.navigateByUrl('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      this.loginFail = true;
      this.loading = false;
    }
  }
}
