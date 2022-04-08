import GameElement from './GameElement';
import { calculateDistance } from './helpers/mathHelpers';

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

  dibujar = () => {
    const matrix = Array(10)
      .fill(null)
      .map(() => Array(10).fill(0));

    // console.log(matrix)
    this.elementos.forEach(({ x, y, renderValue }) => {
      const xValue = x > 0 ? x - 1 : x;
      const yValue = y > 0 ? y - 1 : y;
      matrix[yValue][xValue] = { renderValue };
    });
    matrix.forEach((rowPosition) => {
      console.log(
        `${rowPosition.map((position) => {
          const renderValue = position === 0 ? ' _ ' : ` ${position.renderValue} `;
          return renderValue;
        })}`,
      );
    });
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

  getElementsFromTeam = (teamNumber: number): GameElement[] => this.elementos.filter((elemento) => elemento.team === teamNumber);

  getElementByName = (elementName: string) => this.elementos.find(({ name }) => name === elementName) || new GameElement();

  renderData = (elements: GameElement[]) => {
    elements.forEach(({ name, hp, mana }) => {
      console.log(`
        Name: ${name}
        Hp: ${hp}
        Mana: ${mana}
        --------------------------`);
    });
  };

  debugStatus = () => {
    console.log('\n Elements status debug');
    this.elementos.forEach(this.showStatus);
  };

  showStatus = ({ name, hp, mana }: GameElement) => {
    console.log(`
    Name: ${name}
    Hp: ${hp}
    Mana: ${mana}
    --------------------------`);
  };
}

export default Game;
