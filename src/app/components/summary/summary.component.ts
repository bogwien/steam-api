import { Component, OnInit } from '@angular/core';
import { SteamCredentials } from '../../models/SteamCredentials';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/steam/steam.state';
import { Observable } from 'rxjs';
import { selectCredentials } from '../../store/steam/steam.selectors';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import { SetCredentialsAction, SetSteamIdsToCredentialsAction } from 'src/app/store/steam/steam.actions';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {

  constructor(private store: Store<{ credentials: SteamCredentials }>, private router: Router, private service: SteamService) {
  }

  ngOnInit(): void {
    this.service.credentials.subscribe(value => {
      if (!value || !value.vanityurl || !value.key) {
        this.router.navigate(['']);
      }
    });

    this.service.getPlayerSteamId().then((steamid: string) => {
      this.store.dispatch(new SetSteamIdsToCredentialsAction(steamid));

      this.service.getPlayerSummaries().then(data => {
        console.log(data);
      });
    });
  
  }
}
