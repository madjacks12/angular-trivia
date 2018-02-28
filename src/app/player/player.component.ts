import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Player } from '../player.model';
import { Game } from '../game.model';
import { PlayerService } from '../player.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  players: FirebaseListObservable<any[]>;

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.players = this.playerService.getPlayers();
  }

  submitForm(name: string) {
    var newPlayer: Player = new Player(name, 0);
    this.playerService.addPlayer(newPlayer);
  }

  goToDetailPage(clickedPlayer) {
    // console.log(clickedPlayer.$key);
    this.router.navigate(['players', clickedPlayer.$key]);
  }
}
