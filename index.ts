import Game from './src/Game';
import GameElement from './src/GameElement';
import { BasicBlade, BasicBow, BasicHelmet } from './src/systems/inventory/Items';

const Arquero = GameElement.fromJSON({
  team: 1,
  strength: 10,
  x: 5,
  y: 5,
  visibility: 4,
  renderValue: 'Q',
  name: 'magic_elf',
});

const guerreroMalo = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 5,
  strength: 15,
  renderValue: 'G',
  name: 'orc',
});

const guerreroMalo2 = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 10,
  strength: 15,
  renderValue: 'G',
  name: 'mage_orc',
});

// TODO: como hago para el sistema de turnos ponerlo en un while ?
const run = async () => {
  try {
    // Arquero team 1
    Arquero.addItem('leftHand', BasicBow);
    Arquero.addItem('helmet', BasicHelmet);

    // Orco team 2
    guerreroMalo.addItem('leftHand', BasicBlade);
    guerreroMalo.addItem('helmet', BasicHelmet);

    const game = new Game([Arquero, guerreroMalo, guerreroMalo2]);
    await game.init();

    // TODO: finish turn
  } catch (error) {
    console.log('Game error', error);
  }
};

run();
