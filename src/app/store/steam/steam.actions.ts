import { Action } from '@ngrx/store';
import * as types from './steam.action.types';

export class SetKeyAction implements Action {
  public readonly type = types.setKeyAction;

  constructor(public key: string) {}
}

export type Actions = SetKeyAction;
