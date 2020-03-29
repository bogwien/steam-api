import { Action } from '@ngrx/store';
import { SteamCredentials } from '../../models/SteamCredentials';
import * as types from './steam.action.types';

export class SetCredentialsAction implements Action {
  public readonly type = types.setCredentials;

  constructor(private credentials: SteamCredentials) {
    console.log(credentials);
  }

  getCredentials() {
    return this.credentials;
  }
}

export type Actions = SetCredentialsAction;
