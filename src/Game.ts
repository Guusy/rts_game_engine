import GameElement from './GameElement';
import Render, { options } from './systems/Render';
import FightSystem from './systems/Fight';
import Turns from './systems/Turns';

class Game {
  elementos: GameElement[];

  teams = 2;

  maxTurns = 10;

  turn = {
    which: 0,
    team: 1,
  };

  constructor(elementos: GameElement[]) {
    this.elementos = elementos;
  }

  init = async () => {
    // TODO: check if all energies are empty to move to the other turn
    const elements = this.getElementsFromTeam(this.turn.team);
    const { pj } = await Render.renderPjSelectionMenu(elements);
    if (pj === options.finish_turn.value) {
      return this.finishTurn();
    }
    const element = this.getElementByName(pj);
    Render.showStatus(element);
    return this.renderElementMenu(element);
  };

  drawMap = () => {
    const matrix = Array(10)
      .fill(null)
      .map(() => Array(10).fill(0));

    // console.log(matrix)
    this.elementos.forEach(({ x, y, renderValue }) => {
      const xValue = x > 0 ? x - 1 : x;
      const yValue = y > 0 ? y - 1 : y;
      matrix[yValue][xValue] = { renderValue };
    });

    return Render.gameMap(matrix);
  };

  getElementsToAttack = (element: GameElement) => {
    const enemies = this.elementos.filter((e) => e.team !== element.team);
    return enemies.filter((enemy) => FightSystem.couldAttack(element, enemy));
  };

  getElementsFromTeam = (teamNumber: number): GameElement[] => this.elementos.filter(
    (elemento) => elemento.team === teamNumber && elemento.energy > 0,
  );

  getElementByName = (elementName: string) => this.elementos.find(({ name }) => name === elementName)
    || new GameElement();

  debugStatus = () => {
    console.log('\n Elements status debug');
    this.elementos.forEach(Render.showStatus);
  };

  renderElementMenu = (element: GameElement): any => {
    if (element.energy === 0) {
      console.log('No te queda mas energia en el personaje', element.getName());
      return this.init();
    }
    return Render.renderElementPrompt()
      .then(async ({ menu }) => {
        switch (menu) {
          case 'attack_enemy': {
            const enemiesToAttack = this.getElementsToAttack(element);
            const noEnemiesInRange = enemiesToAttack.length === 0;
            if (noEnemiesInRange) {
              console.error('No hay enemigos en tu rango, vas a tener que moverte !');
              return Render.renderElementPrompt();
            }
            const { enemyToAttack } = await Render.enemiesMenu(enemiesToAttack);
            if (enemyToAttack === options.back.value) {
              return this.renderElementMenu(element);
            }
            const enemy = this.getElementByName(enemyToAttack);
            FightSystem.attack(element, enemy);
            Render.showStatus(enemy);
            return this.renderElementMenu(element);
          }
          case 'render_map':
            this.drawMap();
            return this.renderElementMenu(element);
          case 'back':
            return this.init();
          case 'finish_turn':
            return this.finishTurn();
          default:
            return this.renderElementMenu(element);
        }
      });
  };

  finishTurn = () => {
    Turns.finishTurn(this);
    this.init();
  };
}

export default Game;
