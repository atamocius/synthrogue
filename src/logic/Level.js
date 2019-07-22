import colors from '../utils/colors';
import { indexToCoord } from '../utils/math';

const ROWS = 16;
const COLUMNS = 40;

export const entityType = Object.freeze({
  WALL: 'wall',
  EXIT: 'exit',
  KEY: 'key',
  PLAYER: 'player',
  ENEMY: 'enemy',
});

export function createLevel({ bpm, bars, map, drums }) {
  const walls = [];
  let exit = null;
  let key = null;
  let player = null;
  const enemies = [];

  const data = map
    .split('')
    .map((c, i) => {
      const [x, y] = indexToCoord(i, COLUMNS);
      switch(c) {
        case '#': {
          const e = createWall(x, y);
          walls.push(e);
          return e;
        }
        case 'x': {
          const e = createExit(x, y);
          exit = e;
          return e;
        }
        case 'k': {
          const e = createKey(x, y);
          key = e;
          return e;
        }
        case '@': {
          const e = createPlayer(x, y);
          player = e;
          return e;
        }
        case 'Z': {
          const e = createZombie(x, y);
          enemies.push(e);
          return e;
        }
        case 'S': {
          const e = createSkeleton(x, y);
          enemies.push(e);
          return e;
        }
        case 'V': {
          const e = createVampire(x, y);
          enemies.push(e);
          return e;
        }
        default: return null;
      }
    });

  return {
    bpm,
    bars,
    data,
    rows: ROWS,
    columns: COLUMNS,
    walls,
    exit,
    key,
    player,
    enemies,
    drums,
  };
}

export function bakeSong({ arrangement, patterns }) {
  const result = {
    bars: arrangement.length,
    oh: [],
    ch: [],
    cp: [],
    bd: [],
  };
  for (const p of arrangement) {
    result.oh = result.oh.concat(patterns[p].oh);
    result.ch = result.ch.concat(patterns[p].ch);
    result.cp = result.cp.concat(patterns[p].cp);
    result.bd = result.bd.concat(patterns[p].bd);
  }
  return result;
}

function createExit(x, y) {
  return {
    char: 'k',
    fg: colors.BLACK,
    bg: colors.YELLOW,
    type: entityType.EXIT,
    x,
    y,
    active: true,
  };
}

function createWall(x, y) {
  return {
    char: '#',
    fg: colors.WHITE,
    bg: colors.GRAY,
    type: entityType.WALL,
    x,
    y,
    active: true,
  };
}

function createKey(x, y) {
  return {
    char: 'k',
    fg: colors.YELLOW,
    bg: colors.BLACK,
    type: entityType.KEY,
    x,
    y,
    active: true,
  };
}

function createPlayer(x, y) {
  return {
    char: '@',
    fg: colors.BLUE,
    bg: colors.BLACK,
    type: entityType.PLAYER,
    x,
    y,
    moveSpeed: 1,
    moveAccum: 0,
    active: true,
  };
}

function createZombie(x, y) {
  return {
    char: 'Z',
    fg: colors.RED,
    bg: colors.BLACK,
    type: entityType.ENEMY,
    x,
    y,
    moveSpeed: 0.25,
    moveAccum: 0,
    sightRange: 5,
    active: true,
  };
}

function createSkeleton(x, y) {
  return {
    char: 'S',
    fg: colors.RED,
    bg: colors.GRAY,
    type: entityType.ENEMY,
    x,
    y,
    moveSpeed: 0.5,
    moveAccum: 0,
    sightRange: 5,
    active: true,
  };
}

function createVampire(x, y) {
  return {
    char: 'V',
    fg: colors.BLACK,
    bg: colors.RED,
    type: entityType.ENEMY,
    x,
    y,
    moveSpeed: 1,
    moveAccum: 0,
    sightRange: 7,
    active: true,
  };
}
