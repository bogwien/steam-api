import Player from './player';
import Ban from './ban';

export default interface ExtendedPlayer extends Player {
  ban: Ban | null;
}
