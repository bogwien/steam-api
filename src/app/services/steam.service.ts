import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../store/store.state';
import { SteamCredentials } from '../models/SteamCredentials';
import { Observable } from 'rxjs';
import { selectCredentials } from '../store/steam/steam.selectors';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  public credentials: Observable<SteamCredentials> = this.store.select(selectCredentials);

  constructor(private store: Store<State>, public httpClient: HttpClient) { }

  public async getPlayerSteamId(): Promise<string> {
    let credentials: SteamCredentials;
    this.credentials.subscribe((value: SteamCredentials) => credentials = value);
    
    return await this.loadPlayerSteamId(credentials);
  }

  private async loadPlayerSteamId({ key, vanityurl  }: SteamCredentials): Promise<string> {
    const url = `${environment.api.host}/${environment.api.baseUri}/steam/player-steam-id`;

    const params = new HttpParams({fromObject: {key, vanityurl}});

    const result = await this.httpClient.get<{data: {steamid: string}}>(url, {params, responseType: 'json'}).toPromise();

    return result.data.steamid;
  }

  public async getPlayerSummaries(): Promise<{players: Array<Object>}> {
    let credentials: SteamCredentials;
    this.credentials.subscribe((value: SteamCredentials) => credentials = value);

    return await this.loadPlayerSummaries(credentials);
  }

  private async loadPlayerSummaries({ key, steamids }: SteamCredentials): Promise<{players: Array<Object>}> {
    const url = `${environment.api.host}/${environment.api.baseUri}/steam/player-summaries`;

    const params = new HttpParams({fromObject: {key, steamids}});

    const result = await this.httpClient.get<{data: {players: Array<Object>}}>(url, {params, responseType: 'json'}).toPromise();

    return result.data;
  }
}
