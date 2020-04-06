import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SteamService } from '../../services/steam.service';
import Friend from '../../models/friend';
import Player from '../../models/player';

@Component({
  templateUrl: './player-info.component.html',
})
export class PlayerInfoComponent implements OnInit {
  friends: Player[];
  friendList: Friend[];
  user: Player | null;

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

      this.service.getPlayersSummaries([steamid]).subscribe(userResult => {
        this.user = userResult.data.players[0] || null;
      });

      this.service.getPlayerFriendList(steamid).subscribe(friendListResult => {
        this.friendList = friendListResult.data.friends;

        const steamids = this.friendList.map((friend: Friend) => friend.steamid);

        this.service.getPlayersSummaries(steamids).subscribe(friendsSummariesResult => {
          this.friends = friendsSummariesResult.data.players;
        });
      });
    });
  }

  onPlayerClick(player: Player) {
    this.router.navigate(['info', {steamid: player.steamid}]);
  }
}
