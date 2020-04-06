import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Player from '../../models/player';

@Component({
  templateUrl: './summary.component.html'
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

  isUsernameError() {
    return this.getUsernameControl().errors && this.getUsernameControl().errors.required;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const usernames = this.getUsernameControl().value.split(',');
    this.players = await this.loadPlayers(
      usernames.filter((value: string) => value && !(/^\d+$/.test(value))),
      usernames.filter((value: string) => value && /^\d+$/.test(value))
    );
  }

  private async loadPlayers(usernames: Array<string>, ids: Array<string> = []): Promise<Array<Player>> {
    const asyncSteamIdLoader = async (username: string): Promise<string> => this.service.getPlayerSteamId(username);
    const asyncAllLoader = async (usernames: Array<string>): Promise<Array<string>> => Promise.all(usernames.map(asyncSteamIdLoader));

    const steamIds: Array<string> = await asyncAllLoader(usernames);
    const allSteamIds = ids.concat(steamIds.filter(id => !!id))

    const players = await this.service.getPlayersSummaries(allSteamIds);

    return players;
  }
}
