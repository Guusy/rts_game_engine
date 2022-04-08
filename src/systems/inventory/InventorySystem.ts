export type ItemTypes = 'melee' | 'distance' | 'armor'| 'magic'
export type Item = {
  damage: number;

  physicalArmor: number;
  magicArmor: number;

  effects?: string[];
  type: ItemTypes;
  range: number
};

export class Equipment {
  leftHand!: Item;

  rightHand!: Item;

  body!: Item;

  boots!: Item;

  gloves!: Item;

  helmet!: Item;
}
