import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  theSupabaseClient: SupabaseClient;

  constructor() {
    this.theSupabaseClient = createClient(environment.supabase.url, environment.supabase.key);
  }
}
