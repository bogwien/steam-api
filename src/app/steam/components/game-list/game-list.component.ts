import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import Game from '../../models/game';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnChanges {
  @Input() games: Game[] = [];
  @Output() clicked = new EventEmitter<Game>();

  displayedColumns: string[] = ['img_icon_url', 'name', 'playtime_forever'];
  dataSource = new MatTableDataSource<Game>(this.games);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges({games}: SimpleChanges): void {
    if (typeof games === 'undefined') {
      return;
    }

    const currentGames = games.currentValue;

    this.dataSource = new MatTableDataSource<Game>(currentGames);
    if (games) {
      this.paginator.firstPage();
    }
    this.dataSource.paginator = this.paginator;
  }

  getIconUrl(game: Game): string {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
  }

  onGameClick(game: Game): void {
    this.clicked.emit(game);
  }
}
