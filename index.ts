import inquirer from 'inquirer';
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
  damage: 15,
  renderValue: 'G',
  name: 'orc',
});

const guerreroMalo2 = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 10,
  damage: 15,
  renderValue: 'G',
  name: 'mage_orc',
});

const renderMenu: any = (game: Game, element: GameElement) => inquirer
  .prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'Que queres hacer?',
      choices: [
        {
          name: 'Dibujar mapa',
          value: 'render_map',
        },
        {
          name: 'Atacar enemigo',
          value: 'attack_enemy',
        },
      ],
    },
  ])
  .then(async ({ menu }) => {
    switch (menu) {
      case 'attack_enemy':
        const enemiesToAttack = game.getElementsToAttack(element);
        const { enemyToAttack } = await inquirer.prompt({
          type: 'list',
          name: 'enemyToAttack',
          choices: enemiesToAttack,
        });

        const enemy = game.getElementByName(enemyToAttack);
        game.atacar(element, enemy);
        game.showStatus(enemy);
        return renderMenu(game, element);

      case 'render_map':
        game.dibujar();

      default:
        return renderMenu(game, element);
    }
  });

const run = async () => {
  try {
    const game = new Game([aldeano, Arquero, guerreroMalo, guerreroMalo2]);

    const elements = game.getElementsFromTeam(1);
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'pj',
        message: 'Que personaje queres usar',
        choices: elements.map((element, index) => ({
          name: element.name,
          value: index,
        })),
      },
    ]);

    const element = elements[answers.pj];

    await renderMenu(game, element);
    // TODO: finish turn
  } catch (error) {
    console.log('Game error', error);
  }
};

run();
