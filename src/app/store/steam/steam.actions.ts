import { Action } from '@ngrx/store';
import { SteamCredentials } from '../../models/SteamCredentials';
import * as types from './steam.action.types';

export class SetCredentialsAction implements Action {
  public readonly type = types.setCredentials;

  constructor(private credentials: SteamCredentials) {
  }

  getCredentials() {
    return this.credentials;
  }
}

export class SetSteamIdsToCredentialsAction implements Action {
  public readonly type = types.setSteamIdsToCredentials;

  constructor(private steamids: string) {
  }

  getSteamIds() {
    return this.steamids;
  }
}

export type Actions = SetCredentialsAction | SetSteamIdsToCredentialsAction;
