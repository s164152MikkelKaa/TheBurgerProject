import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  constructor(private theAuth: Auth) { }

  async handleAuth() {
    const theResponse = await this.theAuth.theSignIn();
  }
}
