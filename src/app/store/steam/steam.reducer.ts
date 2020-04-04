import { Actions } from './steam.actions';
import { State } from './steam.state';
import * as types from './steam.action.types';
import { initialState } from './steam.init.state';
import { credentials } from './steam.nodes';

export function reducer(state: State = initialState, action: Actions) {
  switch (action.type) {
    case types.setCredentials:
      return {
        ...state,
        [credentials]: action.getCredentials()
      };
    case types.setSteamIdsToCredentials:
      const creds = state[credentials];
      const steamids = action.getSteamIds();

      return {
        ...state,
        [credentials]: {...creds, steamids}
      };
    default:
      return state;
  }
}
