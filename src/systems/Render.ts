import inquirer from 'inquirer';
import GameElement from '../GameElement';

type PromptChoice = {
  value: string, name: string
}

export const options = {
  render_map: { value: 'render_map', name: 'Dibujar mapa' },
  back: { value: 'back', name: 'Volver atras' },
  finish_turn: { value: 'finish_turn', name: 'Finalizar turno' },

  elementMenu: {
    attack_enemy: { value: 'attack_enemy', name: 'Atacar enemigo' },
    // TODO: movement

  },
};

class RenderSystem {
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
            options.render_map,
            options.elementMenu.attack_enemy,
            options.back,
            options.finish_turn,
          ],
        },
      ]);
  }

  _elementToChoice = (element: GameElement) => ({ name: element.getLabelData(), value: element.name });

  enemiesMenu(enemies: GameElement[]) {
    const choices = enemies.map(this._elementToChoice);
    choices.push(options.back);
    return inquirer.prompt({
      type: 'list',
      message: 'Elije un enemigo',
      name: 'enemyToAttack',
      choices,
    });
  }

  renderPjSelectionMenu = (selfElements: GameElement[]) => {
    const choices: PromptChoice[] = selfElements.map(this._elementToChoice);

    choices.push(options.finish_turn);
    return inquirer.prompt([
      {
        type: 'list',
        name: 'pj',
        message: 'Que personaje queres usar',
        choices,
      },
    ]);
  };

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

export default new RenderSystem();
