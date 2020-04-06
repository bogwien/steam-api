import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/store.state';
import { Observable } from 'rxjs';
import { selectKey } from '../../store/steam/steam.selectors';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Player from '../models/player';
import Friend from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class SteamService {
  public key: Observable<string> = this.store.select(selectKey);

  constructor(private store: Store<State>, public httpClient: HttpClient) {}

  getPlayerSteamId(vanityurl: string): Observable<{data: {steamid: string, success: number}}> {
    return this.request(
      `${environment.api.host}/${environment.api.baseUri}/steam/player-steam-id`,
      new HttpParams({fromObject: {key : this.getKey(), vanityurl: vanityurl.trim()}})
    );
  }

  getPlayersSummaries(steamids: string[]): Observable<{data: {players: Player[]}}> {
    return this.request(
      `${environment.api.host}/${environment.api.baseUri}/steam/player-summaries`,
      new HttpParams({fromObject: {key: this.getKey(), steamids: steamids.join(',')}})
    );
  }

  getPlayerFriendList(steamid: string): Observable<{data: {friends: Friend[]}}> {
    return this.request(
      `${environment.api.host}/${environment.api.baseUri}/steam/player-friend-list`,
      new HttpParams({fromObject: {key: this.getKey(), steamid}})
    );
  }

  private request(url: string, params: HttpParams): Observable<any> {
    return this.httpClient.get(url, {params, responseType: 'json'});
  }

  private getKey(): string {
    let key: string;
    this.key.subscribe((value: string) => key = value);

    return key;
  }
}