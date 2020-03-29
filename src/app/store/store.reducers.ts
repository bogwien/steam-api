import { ActionReducerMap } from '@ngrx/store';
import { State as StoreState } from '../store/store.state';
import { node as steamNode } from './steam/steam.nodes';
import { reducer as steamReducer } from './steam/steam.reducer';

export const reducers: ActionReducerMap<StoreState> = {
  [steamNode]: steamReducer
};
