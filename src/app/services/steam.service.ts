import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../store/store.state';
import { SteamCredentials } from '../models/SteamCredentials';
import { Observable } from 'rxjs';
import { selectCredentials } from '../store/steam/steam.selectors';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  public credentials: Observable<SteamCredentials> = this.store.pipe(select(selectCredentials));
  private readonly api = {
    host: 'api.steampowered.com',
    varsion: 'v0002',
    protocol: 'https',
    actions: {
      summary: {
        interface: 'ISteamUser',
        method: 'GetPlayerSummaries'
      }
    }
  };

  constructor(private store: Store<State>, public httpClient: HttpClient) { }

  private getUrl(action: { interface: string, method: string }) {
    return `${this.api.protocol}://${this.api.host}/${action.interface}/${action.method}/${this.api.varsion}/`;
  }

  public getPlayerSummaries() {
    return this.credentials.subscribe((credentials: SteamCredentials) => this.loadPlayerSummaries(credentials));
  }

  private loadPlayerSummaries({ steamApiKey, steamAccountId  }: SteamCredentials) {
    const action = this.api.actions.summary;
    const url = this.getUrl(action);

    const params = new HttpParams({
      fromObject: {
        key: steamApiKey,
        steamids: steamAccountId,
        format: 'json'
      }
    });

    this.httpClient.get(url, {params, responseType: 'json'}).subscribe(result => {
      console.log(result);
    });
  }
}
