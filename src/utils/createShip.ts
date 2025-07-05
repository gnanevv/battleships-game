export interface Coordinates {
  row: number;
  col: number;
}

export interface Ship {
  length: number;
  hits: number;
  orientation: boolean;
  coords: Coordinates[];
  getStartCoords(): Coordinates;
  hit(): void;
  isSunk(): boolean;
}

const createShip = (
  row: number,
  col: number,
  length: number,
  orientation: boolean
): Ship => {
  const coords: Coordinates[] = [];

  if (orientation) {
    for (let i = 0; i < length; i++) {
      coords.push({ row, col: col + i });
    }
  } else {
    for (let i = 0; i < length; i++) {
      coords.push({ row: row + i, col });
    }
  }

  return {
    length,
    hits: 0,
    orientation,
    coords,
    getStartCoords() {
      return coords[0];
    },
    hit() {
      this.hits++;
    },
    isSunk() {
      return this.hits >= this.length;
    },
  };
};

export default createShip;
