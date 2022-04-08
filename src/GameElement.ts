export default class GameElement {
  x: number = 0;

  y: number = 0;

  hp: number = 100;

  mana: number = 100;

  energy: number = 2;

  status: string = 'inactive';

  name!: string;

  team!: number;

  range!: number;

  visibility!: number;

  damage!: number;

  renderValue!: string;

  static fromJSON(json: any): GameElement {
    return Object.assign(new GameElement(), json);
  }

  getName() :string {
    return this.name.replace('_', ' ');
  }

  getAttributes() {
    const { name, hp, mana } = this;
    return {
      name,
      hp,
      mana,
    };
  }
}
