import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './components/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { GameListComponent } from './components/game-list/game-list.component';

@NgModule({
  declarations: [
    SummaryComponent,
    PlayerInfoComponent,
    PlayerListComponent,
    GameListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatListModule
  ]
})
export class SteamModule { }
