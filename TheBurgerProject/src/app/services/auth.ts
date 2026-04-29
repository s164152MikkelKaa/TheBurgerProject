import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabase!: SupabaseClient
  user = new BehaviorSubject<User | null>(null)

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key);

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        this.router.navigate(['/dashboard']);
      } else {
        this.user.next(null);
      }
    });
  }

  async theSignIn() {
    await this.supabase.auth.signInWithPassword({
      email: '',
      password: ''
    });
  }

  async theSignOut() {
    await this.supabase.auth.signOut();
  }

  get theCurrentUser() {
    return this.user.asObservable();
  }
}
