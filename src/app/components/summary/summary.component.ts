import { Component, OnInit } from '@angular/core';
import { SteamCredentials } from '../../models/SteamCredentials';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/steam/steam.state';
import { Observable } from 'rxjs';
import { selectCredentials } from '../../store/steam/steam.selectors';
import { Router } from '@angular/router';
import { SteamService } from '../../services/steam.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {

  constructor(private router: Router, private service: SteamService) {
  }

  ngOnInit(): void {
    this.service.credentials.subscribe(value => {
      if (!value || !value.steamAccountId || !value.steamApiKey) {
        this.router.navigate(['']);
      }
    });

    this.service.getPlayerSummaries();
  }
}
