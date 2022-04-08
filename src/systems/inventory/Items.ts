/* eslint-disable import/prefer-default-export */
import { Item, ItemTypes } from './InventorySystem';

const itemCreator = ({
  damage = 0, physicalArmor = 0, magicArmor = 0, type = 'armor' as ItemTypes, range = 0,
}): { damage: number; physicalArmor: number; magicArmor: number; type: ItemTypes; range: number; } => ({
  damage, physicalArmor, magicArmor, type, range,
});

export const BasicBlade : Item = itemCreator({ damage: 2, type: 'melee', range: 2 });

export const BasicHelmet : Item = itemCreator({ damage: 2, type: 'armor' });

export const BasicBow : Item = itemCreator({ damage: 2, type: 'distance', range: 5 });
