import { State } from './steam.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SteamCredentials } from '../../models/SteamCredentials';
import { credentials, node } from './steam.nodes';

export const selectSteamFeature = createFeatureSelector<State>(node);

export const selectCredentials = createSelector(
  selectSteamFeature,
  (state: State): SteamCredentials => state[credentials]
);
