import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _supabaseClient = inject(SupabaseService).theSupabaseClient;

  getMyUser() {
    return this._supabaseClient.auth.getUser();
  }

  getMySession() {
    return this._supabaseClient.auth.getSession();
  }

  signUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignInWithPasswordCredentials) {
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }
}
