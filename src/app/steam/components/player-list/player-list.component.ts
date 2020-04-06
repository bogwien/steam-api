import { Component, Input, Output, EventEmitter } from '@angular/core';
import Player from '../../models/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  @Input() playerList: Player[];
  @Output() clicked = new EventEmitter<Player>();

  constructor() { }

  onPlayerClick(player: Player, $event: MouseEvent): void {
    const target = <HTMLElement>$event.target;
    if (target.tagName.toLowerCase() === 'a') {
      return;
    }

    this.clicked.emit(player);
  }
}
