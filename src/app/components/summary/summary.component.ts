import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  username: string;

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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loadPlayer(this.getUsernameControl().value);
  }

  loadPlayer(username: string) {
    this.service.getPlayerSteamId(username).then((steamid: string) => {
      this.service.getPlayersSummaries([steamid]).then(data => {
        console.log(data);
      });
    });
  }
}
