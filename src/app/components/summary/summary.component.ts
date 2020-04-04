import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Player from '../../models/player';

@Component({
  selector: 'app-summary',
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

    this.players = await this.loadPlayers(this.getUsernameControl().value);
  }

  private async loadPlayers(username: string): Promise<Array<Player>> {
    const steamId: string = await this.service.getPlayerSteamId(username);

    const players = await this.service.getPlayersSummaries([steamId]);

    return players;
  }
}
