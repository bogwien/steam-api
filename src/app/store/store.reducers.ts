import { ActionReducerMap } from '@ngrx/store';
import { State as StoreState } from '../store/store.state';
import { reducer as steamReducer } from './steam/steam.reducer';

export const reducers: ActionReducerMap<StoreState> = {
  steam: steamReducer
};
