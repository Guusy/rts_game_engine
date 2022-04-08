import Game from '../Game';

class TurnsSystem {
  finishTurn(game: Game) {
    game.turn.which += 1;
    const currentTeam = game.turn.team;

    if (currentTeam === game.teams) {
      game.turn.team = 1;
    } else {
      game.turn.team += 1;
    }
  }
}

export default new TurnsSystem();
