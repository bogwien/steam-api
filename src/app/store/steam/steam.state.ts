import { SteamCredentials } from '../../models/SteamCredentials';
import { credentials } from './steam.nodes';

export interface State {
  [credentials]: SteamCredentials | null;
}
