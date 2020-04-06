import { Component, Input, Output, EventEmitter } from '@angular/core';
import Player from '../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent {
  @Input() playerList: Player[];
  @Output() clicked = new EventEmitter<Player>();

  constructor() { }

  onPlayerClick(player: Player) {
    this.clicked.emit(player);
  }
}
