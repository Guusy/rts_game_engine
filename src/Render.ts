import inquirer from 'inquirer';
import GameElement from './GameElement';

class Render {
  gameMap = (matrix: any) => {
    matrix.forEach((rowPosition: any) => {
      console.log(
        `${rowPosition.map((position: any) => {
          const renderValue = position === 0 ? ' _ ' : ` ${position.renderValue} `;
          return renderValue;
        })}`,
      );
    });
  };

  renderElementPrompt() :Promise<{menu: string}> {
    return inquirer
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
            {
              name: 'Volver atras',
              value: 'back',
            },
          ],
        },
      ]);
  }

  enemiesMenu(enemies: any) {
    return inquirer.prompt({
      type: 'list',
      name: 'enemyToAttack',
      choices: enemies,
    });
  }

  renderPjSelectionMenu = (selfElements: GameElement[]) => inquirer.prompt([
    {
      type: 'list',
      name: 'pj',
      message: 'Que personaje queres usar',
      choices: selfElements.map((element, index) => ({
        name: element.getName(),
        value: index,
      })),
    },
  ]);

  showStatus = (element: GameElement) => {
    const {
      hp, mana, damage, range, visibility,
    } = element;
    console.log(`
    Name: ${element.getName()}
    Hp: ${hp}
    Mana: ${mana}
    Damage: ${damage}
    Range: ${range}
    Visibility: ${visibility}
    --------------------------`);
  };
}

export default new Render();
