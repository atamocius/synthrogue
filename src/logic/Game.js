import { entityType } from './Level';
import {
  coordToIndex,
  distance,
  manhattanDist
} from '../utils/math';
import direction from '../utils/direction';
import * as rng from '../utils/random';

export const gameEvent = Object.freeze({
  NOTHING_HAPPENED: 'nothing happened',
  PLAYER_WAITED: 'player waited',
  PLAYER_MOVED: 'player moved',
  ENEMY_WAITED: 'enemy waited',
  ENEMY_MOVED: 'enemy moved',
  GAME_OVER: 'game over',
  LEVEL_EXIT: 'exited the level',
  KEY_COLLECTED: 'key collected',
  LOST_LIFE: 'lose a life',
});

export default class Game {
  loadLevel(level, maxTicks, seed) {
    this._origLevel = JSON.parse(JSON.stringify(level));
    this._seed = seed || Date.now();

    this._moves = [];
    this._maxTicks = maxTicks;

    this.resetLevel();
  }

  resetLevel() {
    rng.init(this._seed);
    this._level = JSON.parse(JSON.stringify(this._origLevel));
    this._hasKey = false;
    this._tickCount = -1;
    this._lives = 1;
  }

  get level() {
    return this._level;
  }

  *pumpEvents() {
    this._tickCount++;

    if (this._tickCount >= this._maxTicks) {
      this.resetLevel();
      this._tickCount = 0;
    }

    const moveDir = this._moves[this._tickCount];

    if (moveDir !== undefined) {
      // move player
      yield this._movePlayer(moveDir);
    }

    // move enemies
    for (const ev of this._moveEnemies()) {
      yield ev;
    }
  }

  get tickCount() {
    return this._tickCount;
  }

  setMove(index, dir) {
    this._moves[index] = dir;
  }

  get moves() {
    return this._moves;
  }

  _movePlayer(dir) {
    const player = this._level.player;
    const adj = this._getEntityRelative(player, dir);

    // Out of bounds
    if (adj === undefined) {
      return gameEvent.PLAYER_WAITED;
    }

    // Empty
    if (adj === null) {
      this._moveByDir(player, dir);
      return gameEvent.PLAYER_MOVED;
    }

    // Collisions
    return this._resolveCollision(player, adj);
  }

  *_moveEnemies() {
    const dirs = [
      direction.N,
      direction.S,
      direction.W,
      direction.E,
    ];

    const p = this._level.player;

    for (let i = 0; i < this._level.enemies.length; i++) {
      const e = this._level.enemies[i];

      const dist = distance(e.x, e.y, p.x, p.y);

      // Sight & pursuit
      let dir;
      if (dist <= e.sightRange) {
        dir = this._pickLowestCostDir(e, p);
      } else {
        dir = rng.select(dirs);
      }

      yield this._moveEnemy(e, dir);
    }
  }

  _pickLowestCostDir(e, p) {
    const scores = [];

    const eN = this._getEntity(e.x, e.y - 1);
    const eS = this._getEntity(e.x, e.y + 1);
    const eW = this._getEntity(e.x - 1, e.y);
    const eE = this._getEntity(e.x + 1, e.y);

    if (eN && eN.type === p.type) {
      scores[direction.N] = 0;
    } else if (eN === null) {
      scores[direction.N] = manhattanDist(e.x, e.y - 1, p.x, p.y);
    } else {
      scores[direction.N] = 1000;
    }

    if (eS && eS.type === p.type) {
      scores[direction.S] = 0;
    } else if (eS === null) {
      scores[direction.S] = manhattanDist(e.x, e.y + 1, p.x, p.y);
    } else {
      scores[direction.S] = 1000;
    }
    
    if (eW && eW.type === p.type) {
      scores[direction.W] = 0;
    } else if (eW === null) {
      scores[direction.W] = manhattanDist(e.x - 1, e.y, p.x, p.y);
    } else {
      scores[direction.W] = 1000;
    }

    if (eE && eE.type === p.type) {
      scores[direction.E] = 0;
    } else if (eE === null) {
      scores[direction.E] = manhattanDist(e.x + 1, e.y, p.x, p.y);
    } else {
      scores[direction.E] = 1000;
    }

    const lowest = Math.min(...scores);
    return scores.indexOf(lowest);
  }

  _moveEnemy(enemy, dir) {
    const adj = this._getEntityRelative(enemy, dir);

    enemy.moveAccum += enemy.moveSpeed;

    if (enemy.moveAccum < 1) {
      return gameEvent.ENEMY_WAITED;
    }

    enemy.moveAccum = 0;

    // Out of bounds
    if (adj === undefined) {
      return gameEvent.ENEMY_WAITED;
    }

    // Empty
    if (adj === null) {
      this._moveByDir(enemy, dir);
      return gameEvent.ENEMY_MOVED;
    }

    // Collisions
    return this._resolveCollision(enemy, adj);
  }

  _moveByDir(e, dir) {
    const cols = this._level.columns;

    let i = coordToIndex(e.x, e.y, cols);
    this._level.data[i] = null;

    if (dir === direction.N) {
      e.y--;
    } else if (dir === direction.S) {
      e.y++;
    } else if (dir === direction.W) {
      e.x--;
    } else if (dir === direction.E) {
      e.x++;
    } else {
      throw new Error(`Unsupported direction '${dir}'`);
    }

    i = coordToIndex(e.x, e.y, cols);
    this._level.data[i] = e;
  }

  _moveToLocation(e, tx, ty) {
    const cols = this._level.columns;

    const i = coordToIndex(e.x, e.y, cols);
    this._level.data[i] = null;
    const ti = coordToIndex(tx, ty, cols);
    this._level.data[ti] = e;

    e.x = tx;
    e.y = ty;
  }

  _getEntity(x, y) {
    const rows = this._level.rows;
    const cols = this._level.columns;

    if (x < 0 || x >= cols || y < 0 || y >= rows) {
      return undefined;
    }

    const i = coordToIndex(x, y, cols);
    return this._level.data[i];
  }

  _getEntityRelative(e, dir) {
    if (dir === direction.N) {
      return this._getEntity(e.x, e.y - 1);
    } else if (dir === direction.S) {
      return this._getEntity(e.x, e.y + 1);
    } else if (dir === direction.W) {
      return this._getEntity(e.x - 1, e.y);
    } else if (dir === direction.E) {
      return this._getEntity(e.x + 1, e.y);
    }

    return undefined;
  }

  _resolveCollision(a, b) {
    if (!a.active || !b.active) {
      return gameEvent.NOTHING_HAPPENED;
    }

    // player to key -> move
    if (
      a.type === entityType.PLAYER &&
      b.type === entityType.KEY
    ) {
      this._moveToLocation(a, b.x, b.y);
      b.active = false;
      this._hasKey = true;
      return gameEvent.KEY_COLLECTED;
    }

    // player to wall -> stay
    if (
      a.type === entityType.PLAYER &&
      b.type === entityType.WALL
    ) {
      return gameEvent.PLAYER_WAITED;
    }

    // player to exit -> move -> next level
    if (
      a.type === entityType.PLAYER &&
      b.type === entityType.EXIT
    ) {
      if (this._hasKey) {
        this._moveToLocation(a, b.x, b.y);
        return gameEvent.LEVEL_EXIT;
      }

      return gameEvent.PLAYER_WAITED;
    }

    // player to enemy -> stay -> lose a life
    if (
      a.type === entityType.PLAYER &&
      b.type === entityType.ENEMY
    ) {
      this._lives--;

      if (this._lives <= 0) {
        return gameEvent.GAME_OVER;
      }

      return gameEvent.LOST_LIFE;
    }

    // enemy to key -> stay
    if (
      a.type === entityType.ENEMY &&
      b.type === entityType.KEY
    ) {
      return gameEvent.ENEMY_WAITED;
    }

    // enemy to exit -> stay
    if (
      a.type === entityType.ENEMY &&
      b.type === entityType.EXIT
    ) {
      return gameEvent.ENEMY_WAITED;
    }

    // enemy to wall -> stay
    if (
      a.type === entityType.ENEMY &&
      b.type === entityType.WALL
    ) {
      return gameEvent.ENEMY_WAITED;
    }

    // enemy to enemy -> stay
    if (
      a.type === entityType.ENEMY &&
      b.type === entityType.ENEMY
    ) {
      return gameEvent.ENEMY_WAITED;
    }

    // enemy to player -> stay -> lose a life
    if (
      a.type === entityType.ENEMY &&
      b.type === entityType.PLAYER
    ) {
      this._lives--;

      if (this._lives <= 0) {
        return gameEvent.GAME_OVER;
      }

      return gameEvent.LOST_LIFE;
    }

    return gameEvent.NOTHING_HAPPENED;
  }
}