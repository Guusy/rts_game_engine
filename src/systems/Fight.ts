import GameElement from '../GameElement';
import { calculateDistance } from '../helpers/mathHelpers';

class FightSystem {
  couldAttack = (elementoA: GameElement, elementoB: GameElement) => {
    const distancia = calculateDistance(elementoA, elementoB);
    return elementoA.range >= distancia;
  };

  attack(elementA : GameElement, elementB: GameElement) { // TODO: add type attack
    // TODO: add validation of energy
    elementA.energy -= 1;
    elementB.hp -= elementA.damage;
  }
}

export default new FightSystem();
