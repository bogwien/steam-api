import { Component, Input, Output, EventEmitter, ViewChild, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import Player from '../../models/player';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnChanges {
  @Input() playerList: Player[];
  @Output() clicked = new EventEmitter<Player>();

  displayedColumns: string[] = ['avatar', 'personaname', 'realname', 'lastlogoff'];
  dataSource = new MatTableDataSource<Player>(this.playerList);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges({playerList}: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Player>(playerList.currentValue);
  }

  onPlayerClick(player: Player, $event: MouseEvent): void {
    const target = <HTMLElement>$event.target;
    if (target.tagName.toLowerCase() === 'a') {
      return;
    }

    this.clicked.emit(player);
  }
}
