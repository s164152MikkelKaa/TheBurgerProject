import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/DataAccess/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TheBurgerProject');

  protected router = inject(Router);
  private _authService = inject(AuthService);

  async signOut() {
    await this._authService.signOut();
    this.router.navigateByUrl('/');
  }
}
