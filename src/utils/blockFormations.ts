export interface BlockPosition {
  x: number;
  y: number; // distance from ground
}

export interface BlockFormation {
  name: string;
  blocks: BlockPosition[];
}

export const BLOCK_FORMATIONS: BlockFormation[] = [
  {
    name: 'row1',
    blocks: [
      { x: 200, y: 200 },
      { x: 270, y: 200 },
      { x: 340, y: 200 },
      { x: 410, y: 200 },
    ]
  },
  {
    name: 'wall',
    blocks: [
      { x: 200, y: 150 },
      { x: 270, y: 150 },
      { x: 340, y: 150 },
      { x: 200, y: 220 },
      { x: 270, y: 220 },
      { x: 340, y: 220 },
    ]
  },
  {
    name: 'scattered',
    blocks: [
      { x: 180, y: 200 },
      { x: 280, y: 160 },
      { x: 380, y: 200 },
      { x: 320, y: 240 },
    ]
  }
];

// In game, randomly select formation
export const getRandomFormation = (): BlockFormation => {
  return BLOCK_FORMATIONS[Math.floor(Math.random() * BLOCK_FORMATIONS.length)];
};
