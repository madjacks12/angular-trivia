import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game.model';
import { Player } from '../player.model';
import { GameService } from '../game.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { PlayerService } from '../player.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService, PlayerService]
})

export class GameComponent implements OnInit {
  playerId: string;
  playerToDisplay;
  result: string = '';
  players: FirebaseListObservable<any[]>;
  games: FirebaseListObservable<any[]>;
  constructor(
    private router: Router,
    private gameService: GameService,
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.games = this.gameService.getGame();
    this.route.params.forEach((urlParameters) => {
      this.playerId = urlParameters['id'];
    });
    this.playerToDisplay = this.playerService.getPlayerById(this.playerId);
  }
  selectAnswer(clickedAnswer, game) {
    if (clickedAnswer === game.answerKey) {
      this.playerToDisplay.score += 1;
    }
    console.log(clickedAnswer);
  }
}
