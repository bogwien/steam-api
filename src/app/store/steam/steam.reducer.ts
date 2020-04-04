import { Actions } from './steam.actions';
import { State } from './steam.state';
import * as types from './steam.action.types';
import { initialState } from './steam.init.state';

export function reducer(state: State = initialState, action: Actions) {
  switch (action.type) {
    case types.setKeyAction:
      return {
        ...state,
        key: action.key
      };
    default:
      return state;
  }
}
