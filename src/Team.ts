import GameElement from './GameElement';

class Team {
  id: number;

  elements: GameElement[];

  constructor({ id, elements }: any) {
    this.id = id;
    this.elements = elements;
  }
}

export default Team;
