import GameElement from './GameElement';
import { calculateDistance } from './helpers/mathHelpers';
import Render from './Render';

class Game {
  elementos: GameElement[];

  maxTurns = 10;

  turn = {
    which: 0,
    team: 1,
  };

  constructor(elementos: GameElement[]) {
    this.elementos = elementos;
  }

  init = async () => {
    const elements = this.getElementsFromTeam(this.turn.team);
    const { pj } = await Render.renderPjSelectionMenu(elements);

    const element = elements[pj];
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

  atacar = (elementoA: GameElement, elementoB: GameElement) => {
    elementoB.hp -= elementoA.damage;
  };

  puedeAtacar = (elementoA: GameElement, elementoB: GameElement) => {
    const distancia = calculateDistance(elementoA, elementoB);
    return elementoA.range >= distancia;
  };

  getElementsToAttack = (element: GameElement) => {
    const enemies = this.elementos.filter((e) => e.team !== element.team);

    return enemies.filter((enemy) => this.puedeAtacar(element, enemy));
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
            const { enemyToAttack } = await Render.enemiesMenu(enemiesToAttack);
            const enemy = this.getElementByName(enemyToAttack);
            element.energy -= 1;
            this.atacar(element, enemy);
            Render.showStatus(enemy);
            return this.renderElementMenu(element);
          }
          case 'render_map':
            this.drawMap();
            return this.renderElementMenu(element);
          case 'back':
            return this.init();
          default:
            return this.renderElementMenu(element);
        }
      });
  };
}

export default Game;
