export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

export function scale(value, min, max) {
  return value * (max - min) + min;
}

export function nearest(value, min, max, steps) {
  const v = Math.round(normalize(value, min, max) * steps) / steps;
  return scale(v, min, max);
}

export function getPointOnCircle(
  radians,
  centerX = 0,
  centerY = 0,
  radius = 1
) {
  const x = radius * Math.cos(radians) + centerX;
  const y = radius * Math.sin(radians) + centerY;
  return [x, y];
}

export function indexToCoord(index, columns) {
  const x = index % columns;
  const y = ~~(index / columns);
  return [x, y];
}

export function coordToIndex(x, y, columns) {
  return y * columns + x;
}

export function distance(x1, y1, x2, y2) {
  const a = x2 - x1;
  const b = y2 - y1;
  return Math.sqrt(a * a + b * b);
}

export function manhattanDist(x, y, goalX, goalY, d = 1) {
  const dx = Math.abs(x - goalX);
  const dy = Math.abs(y - goalY);
  return d * (dx + dy);
}