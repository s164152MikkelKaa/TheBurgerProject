import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TheBurgerProject');

  constructor(private theAuth: Auth, private router: Router) { }

  signOut() {
    this.theAuth.theSignOut();
    this.router.navigate(['/login']);
  }
}
