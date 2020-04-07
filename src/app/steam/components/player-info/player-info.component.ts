import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import Friend from '../../models/friend';
import Player from '../../models/player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import Ban from '../../models/ban';
import Group from '../../models/group';

@Component({
  templateUrl: './player-info.component.html',
})
export class PlayerInfoComponent implements OnInit {
  friends: Player[] = [];
  friendList: Friend[] = [];
  user: Player | null;
  bans: Ban[] = [];
  groups: Group[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private service: SteamService) { }

  ngOnInit() {
    this.service.key.subscribe(value => {
      if (!value) {
        this.router.navigate(['']);
      }
    });

    this.route.paramMap.subscribe((params: ParamMap): void => {
      const steamid: string = params.get('steamid');
      if (!steamid) {
        this.router.navigate(['summary']);
      }

      this.service.getPlayerSummaries([steamid]).subscribe(userResult => {
        this.user = userResult.data.players[0] || null;
      });

      this.service.getPlayerFriendList(steamid).subscribe(friendListResult => {
        this.friendList = friendListResult.data.friends;

        const steamids = this.friendList.map((friend: Friend) => friend.steamid);

        this.service.getPlayerSummaries(steamids).subscribe(friendsSummariesResult => {
          this.friends = friendsSummariesResult.data.players;
        });

        this.service.getPlayerBans(steamids).subscribe(bansResult => {
          this.bans = bansResult.data;
        });
      });

      this.service.getUserGroupList(steamid).subscribe(groupsResult => {
        this.groups = groupsResult.data.groups;
      });
    });
  }

  onPlayerClick(player: Player) {
    this.router.navigate(['info', {steamid: player.steamid}]);
  }

  getGroupUrl(group: Group): string {
    return `http://steamcommunity.com/gid/${group.gid}`;
  }
}
