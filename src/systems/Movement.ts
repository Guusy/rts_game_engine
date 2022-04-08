import GameElement from '../GameElement';

class MovementSystem {
  moveElement(element: GameElement, movement: { x: number; y: number }) {
    // TODO: validate it
    element.x = movement.x;
    element.y = movement.y;
  }
}

export default new MovementSystem();
