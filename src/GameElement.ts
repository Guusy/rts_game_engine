import { Equipment, Item } from './systems/inventory/InventorySystem';

const equipment = new Equipment();
type EquipmentsKeys = keyof typeof equipment;
export default class GameElement {
  x: number = 0;

  y: number = 0;

  hp: number = 100;

  mana: number = 100;

  energy: number = 2;

  status: string = 'inactive';

  name!: string;

  team!: number;

  visibility!: number;

  strength!: number;

  renderValue!: string;

  equipment: Equipment = new Equipment();

  static fromJSON(json: any): GameElement {
    return Object.assign(new GameElement(), json);
  }

  addItem(key: EquipmentsKeys, item: Item) {
    this.equipment[key] = item;
  }

  getAttackRange() {
    return this.equipment?.leftHand?.range || 1;
  }

  getAttackType() {
    
  }

  getName(): string {
    return this.name.replace('_', ' ');
  }

  getFullDamage() {
    const { leftHand, rightHand } = this.equipment;

    const rightHandValue = rightHand ? rightHand.damage : 0;
    const leftHandValue = leftHand ? leftHand.damage : 0;

    return this.strength + rightHandValue + leftHandValue;
  }

  getLabelData(): string {
    return `${this.getName()} (hp:${this.hp}, energy:${this.energy}, dmg:${
      this.getFullDamage()}, range: ${this.getAttackRange()})`;
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
