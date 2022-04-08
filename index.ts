import Game from './src/Game';
import GameElement from './src/GameElement';

const aldeano = GameElement.fromJSON({
  team: 1,
  x: 1,
  y: 5,
  bag: [{ id: 'gold', value: 10 }],
  renderValue: 'A',
  name: 'villager',
});

const Arquero = GameElement.fromJSON({
  team: 1,
  damage: 10,
  x: 5,
  y: 5,
  range: 3,
  visibility: 4,
  renderValue: 'Q',
  name: 'magic_elf',
});

const guerreroMalo = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 5,
  range: 3,
  damage: 15,
  renderValue: 'G',
  name: 'orc',
});

const guerreroMalo2 = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 10,
  range: 5,
  damage: 15,
  renderValue: 'G',
  name: 'mage_orc',
});

// TODO: como hago para el sistema de turnos ponerlo en un while ?
const run = async () => {
  try {
    const game = new Game([aldeano, Arquero, guerreroMalo, guerreroMalo2]);
    await game.init();

    // TODO: finish turn
  } catch (error) {
    console.log('Game error', error);
  }
};

run();
