import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Player from '../../models/player';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  username: string;
  players: Array<Player>;

  form: FormGroup = new FormGroup({
    username: new FormControl(this.username, Validators.required),
  });

  constructor(private router: Router, private service: SteamService) {}

  ngOnInit(): void {
    this.service.key.subscribe(value => {
      if (!value) {
        this.router.navigate(['']);
      }
    });
  }

  private getUsernameControl() {
    return this.form.controls.username;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const usernames = this.getUsernameControl().value.split(',');
    this.loadPlayers(
      usernames.filter((value: string) => value && !(/^\d+$/.test(value))),
      usernames.filter((value: string) => value && /^\d+$/.test(value))
    );
  }

  private loadPlayers(usernames: Array<string>, ids: Array<string> = []): void {
    forkJoin(usernames.map(username => this.service.getPlayerSteamId(username))).subscribe(results => {
      const steamIds: string[] = results.filter(data => data.data.success === 1).map(data => data.data.steamid);
      const allSteamIds: string[] = ids.concat(steamIds);

      this.service.getPlayersSummaries(allSteamIds).subscribe(result => {
        this.players = result.data.players;
      });
    });
  }

  onPlayerClick(player: Player) {
    this.router.navigate(['info', {steamid: player.steamid}]);
  }
}
