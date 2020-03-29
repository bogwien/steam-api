import { State as Steam } from './steam/steam.state';
import { node } from './steam/steam.nodes';

export interface State {
  [node]: Steam
}
