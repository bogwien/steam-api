import { State } from './steam.state';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectSteamFeature = createFeatureSelector<State>('steam');

export const selectKey = createSelector(
  selectSteamFeature,
  (state: State): string => state.key
);
