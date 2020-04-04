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
  credentials: SteamCredentials = { key: null, vanityurl: null, steamids: null};

  form: FormGroup = new FormGroup({
    key: new FormControl(this.credentials.key, Validators.required),
    vanityurl: new FormControl(this.credentials.vanityurl, Validators.required)
  });

  constructor(private store: Store<{ credentials: SteamCredentials }>, private router: Router) {
  }

  getSteamApiKeyErrors() {
    return this.form.controls.key.errors;
  }

  getSteamAccountIdErrors() {
    return this.form.controls.vanityurl.errors;
  }

  isSteamApiKeyError() {
    return this.getSteamApiKeyErrors() && this.getSteamApiKeyErrors().required;
  }

  isSteamAccountIdError() {
    return this.getSteamAccountIdErrors() && this.getSteamAccountIdErrors().required;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.dispatch(new SetCredentialsAction(this.form.value));

    this.router.navigate(['summary']);
  }
}
