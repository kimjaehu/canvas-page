export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function collide(x1, y1, radius1, x2, y2, radius2) {
  if (distance(x1, y1, x2, y2) <= radius1 + radius2) {
    return true;
  } else {
    return false;
  }
}
