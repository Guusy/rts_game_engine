import GameElement from '../GameElement';

export function calculateDistance(p1: GameElement, p2: GameElement) {
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;

  return Math.sqrt(x * x + y * y);
}
