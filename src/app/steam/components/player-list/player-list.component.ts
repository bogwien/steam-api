import { Component, Input, Output, EventEmitter, ViewChild, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import Player from '../../models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Ban from '../../models/ban';
import ExtendedPlayer from '../../models/extended-player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnChanges {
  @Input() players: Player[] = [];
  @Input() bans: Ban[] = [];
  @Output() clicked = new EventEmitter<ExtendedPlayer>();

  displayedColumns: string[] = ['avatar', 'personaname', 'realname', 'lastlogoff'];
  dataSource = new MatTableDataSource<ExtendedPlayer>(this.getExtenedPlayers(this.players, this.bans));

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges({players, bans}: SimpleChanges): void {
    const currentPlayers = typeof players === 'undefined' ? this.players : players.currentValue;
    const currentBans = typeof bans === 'undefined' ? this.bans : bans.currentValue;

    const data: ExtendedPlayer[] = this.getExtenedPlayers(
      currentPlayers || [],
      currentBans || []
    );

    this.dataSource = new MatTableDataSource<ExtendedPlayer>(data);
  }

  getExtenedPlayers(players: Player[], bans: Ban[]): ExtendedPlayer[] {
    return players.map((player: Player): ExtendedPlayer => {
      const ban: Ban = bans.find((ban: Ban): boolean => ban.SteamId === player.steamid);

      return this.getExtendedPlayer(player, ban || null);
    });
  }

  getExtendedPlayer(player: Player, ban: Ban|null): ExtendedPlayer {
    return Object.assign({}, player, {ban});
  }

  onPlayerClick(player: ExtendedPlayer, $event: MouseEvent): void {
    const target = <HTMLElement>$event.target;
    if (target.tagName.toLowerCase() === 'a') {
      return;
    }

    this.clicked.emit(player);
  }
}
