import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { reducers } from '../../store/store.reducers';
import { SteamCredentials } from '../../models/SteamCredentials';
import { Router } from '@angular/router';
import { SetCredentialsAction } from '../../store/steam/steam.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  credentials: SteamCredentials = { steamApiKey: null, steamAccountId: null};

  form: FormGroup = new FormGroup({
    steamApiKey: new FormControl(this.credentials.steamApiKey, Validators.required),
    steamAccountId: new FormControl(this.credentials.steamAccountId, Validators.required)
  });

  constructor(private store: Store<{ credentials: SteamCredentials }>, private router: Router) {
  }

  getSteamApiKeyErrors() {
    return this.form.controls.steamApiKey.errors;
  }

  getSteamAccountIdErrors() {
    return this.form.controls.steamAccountId.errors;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(new SetCredentialsAction(this.form.value));

    this.router.navigate(['summary']);
  }
}
