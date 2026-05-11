import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/DataAccess/auth-service';
import { Router } from '@angular/router';

interface TheSignUpForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-signup-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  signupFail = false;
  loading = false;

  theFormNew = this._formBuilder.group<TheSignUpForm>({
    email: this._formBuilder.control(null, [
      Validators.required,
      Validators.email
    ]),
    password: this._formBuilder.control(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(35),
      Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{0,}')
    ])
  });
  //    RegEx pattern notes:
  // Atleast one capital letter: (?=[^A-Z]*[A-Z])
  // Atleast two capital letters: (?=(?:[^A-Z]*[A-Z]){2})
  // Atleast ten capital letters: (?=(?:[^A-Z]*[A-Z]){10})

  // Capital letter: (?=[^A-Z]*[A-Z])
  // Non-capital letter: (?=[^a-z]*[a-z])
  // Special character: (?=[^!@#$%^&*()]*[!@#$%^&*()])
  // Nummerical character: (?=[^0-9]*[0-9])
  // Fisk? undersøg: (?=[^!-0]*[!-0])          -----*****-----

  async doSignup() {
    if (this.theFormNew.invalid) return;

    try {
      this.loading = true;
      const { error } = await this._authService.signUp({
        email: this.theFormNew.value.email ?? '',
        password: this.theFormNew.value.password ?? ''
      });

      if (error) throw error;
      this.loading = false;
      this._router.navigateByUrl('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      this.signupFail = true;
      this.loading = false;
    }
  }
}
