import { Injectable } from '@angular/core';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private supabase!: SupabaseClient;
  user = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabase.url, environment.supabase.key);

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        this.user.next(session!.user);
        if (event === 'SIGNED_IN') {
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.user.next(null);
      }
    });
  }

  async theSignin(theEmail: string, thePassword: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: theEmail,
      password: thePassword
    });
    return error;
  }

  async theSignup(theEmail: string, thePassword: string) {

  }

  async theSignOut() {
    await this.supabase.auth.signOut();
  }

  get theCurrentUser() {
    return this.user.asObservable();
  }
}
