import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './components/summary/summary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

@NgModule({
  declarations: [
    SummaryComponent,
    PlayerInfoComponent,
    PlayerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SteamModule { }
