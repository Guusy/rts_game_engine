import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    mode: Phaser.Scale.LANDSCAPE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};
