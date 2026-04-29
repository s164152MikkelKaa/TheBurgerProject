import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css',
})
export class SignupComponent {
  constructor(private theAuth: Auth) { }
}
