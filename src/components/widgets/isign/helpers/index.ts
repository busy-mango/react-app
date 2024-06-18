export const iTrigoOpposite = (hypotenuse: number) => {
  const degrees = 30;
  const radians = degrees * (Math.PI / 180);
  return Math.sin(radians) * hypotenuse;
};

export const iTrigoAdjacent = (hypotenuse: number) => {
  const degrees = 30;
  const radians = degrees * (Math.PI / 180);
  return Math.cos(radians) * hypotenuse;
};

export const iTrigo = (x: number, y: number, r: number) => {
  const point1 = `${x} ${y - r}`;
  const point2 = `${x - iTrigoAdjacent(r)} ${y + iTrigoOpposite(r)}`;
  const point3 = `${x + iTrigoAdjacent(r)} ${y + iTrigoOpposite(r)}`;
  return `M${point1} L${point2} L${point3}Z`;
};

export const iCirclePath = (
  x: number = 512,
  y: number = 512,
  r: number = 448
) => {
  return `M ${x} ${y - r} A ${r} ${r} 0 1 1 ${x} ${y + r} A ${r} ${r} 0 1 1 ${x} ${y - r}Z`;
};
