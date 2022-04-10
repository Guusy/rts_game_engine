import Phaser, { Game } from "phaser";
import CustomGame from "../CustomGame";
import GameElement from "../GameElement";
import { BasicBow, BasicHelmet, BasicBlade } from "../systems/inventory/Items";

const Arquero = GameElement.fromJSON({
  team: 1,
  strength: 10,
  x: 5,
  y: 5,
  visibility: 4,
  renderValue: "Magic elf",
  name: "magic_elf",
});

const guerreroMalo = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 5,
  strength: 15,
  renderValue: "Orco",
  name: "orc",
});

const guerreroMalo2 = GameElement.fromJSON({
  team: 2,
  x: 8,
  y: 10,
  strength: 15,
  renderValue: "Orco 2",
  name: "mage_orc",
});

Arquero.addItem("leftHand", BasicBow);
Arquero.addItem("helmet", BasicHelmet);

// Orco team 2
guerreroMalo.addItem("leftHand", BasicBlade);
guerreroMalo.addItem("helmet", BasicHelmet);

export default class Demo extends Phaser.Scene {
  isElementSelected = false;
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("map", "assets/map.png");
  }

  create() {
    const matrix = Array(10)
      .fill(null)
      .map(() => Array(10).fill(0));

    [Arquero, guerreroMalo, guerreroMalo2].forEach(({ name,x, y, renderValue }) => {
      const xValue = x > 0 ? x - 1 : x;
      const yValue = y > 0 ? y - 1 : y;
      matrix[yValue][xValue] = { name, renderValue };
    });


    let positionX = 200;
    let positionY = 100;
    const size = 64;
    matrix.forEach((row) => {
      positionX = 200;
      row.forEach((item) => {
        const button = this.add
          .text(positionX, positionY, (item.renderValue) ? item.renderValue : " ")
          .setX(positionX)
          .setY(positionY)
          .setStyle({ backgroundColor: "#111", fontSize: "24px" })
          .setDisplaySize(size, size)
          .setInteractive({ useHandCursor: true })
          .on("pointerover", () =>
            button.setStyle({ backgroundColor: "white" })
          )
          .on("pointerout", () => button.setStyle({ backgroundColor: "#111" }))
          .on("pointerdown", () => {
            console.log("hey you selected the item", item);
          });

        positionX += size + 2;
      });
      positionY += size + 2;
    });

  }
}
