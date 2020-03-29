import { Component, OnInit } from '@angular/core';
import { SteamCredentials } from '../../models/SteamCredentials';
import { Store, select } from '@ngrx/store';
import { State } from '../../store/steam/steam.state';
import { Observable } from 'rxjs';
import { selectCredentials } from '../../store/steam/steam.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
  public credentials: Observable<SteamCredentials> = this.store.pipe(select(selectCredentials));

  constructor(private store: Store<State>, private router: Router) {
  }

  ngOnInit(): void {
    this.credentials.subscribe(value => {
      if (!value || !value.steamAccountId || !value.steamApiKey) {
        this.router.navigate(['']);
      }
    });
  }
}
