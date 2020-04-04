import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/store.state';
import { Observable } from 'rxjs';
import { selectKey } from '../store/steam/steam.selectors';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Player from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  public key: Observable<string> = this.store.select(selectKey);

  constructor(private store: Store<State>, public httpClient: HttpClient) {}

  private getKey(): string {
    let key: string;
    this.key.subscribe((value: string) => key = value);

    return key;
  }

  public async getPlayerSteamId(vanityurl: string): Promise<string> {
    const key: string = this.getKey();
    
    return await this.loadPlayerSteamId(key, vanityurl.trim());
  }

  private async loadPlayerSteamId(key: string, vanityurl: string): Promise<string> {
    const url = `${environment.api.host}/${environment.api.baseUri}/steam/player-steam-id`;

    const params = new HttpParams({fromObject: {key, vanityurl}});

    const result = await this.httpClient.get<{data: {steamid: string, success: number}}>(url, {params, responseType: 'json'}).toPromise();

    if (result.data.success !== 1) {
      return null;
    }

    return result.data.steamid;
  }

  public async getPlayersSummaries(steamids: Array<string>): Promise<Array<Player>> {
    const key: string = this.getKey();

    return await this.loadPlayersSummaries(key, steamids.join(','));
  }

  private async loadPlayersSummaries(key: string, steamids: string): Promise<Array<Player>> {
    const url = `${environment.api.host}/${environment.api.baseUri}/steam/player-summaries`;

    const params = new HttpParams({fromObject: {key, steamids}});

    const result = await this.httpClient.get<{data: {players: Array<Player>}}>(url, {params, responseType: 'json'}).toPromise();

    return result.data.players;
  }
}
