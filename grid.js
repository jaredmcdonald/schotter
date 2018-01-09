export function distortGrid(grid, distortionFactor, randomFn = Math.random) {
  return grid.map((column, columnIndex) =>
    column.map(({ x, y }, rowIndex) => ({
      x: x + randomFn() * rowIndex * distortionFactor,
      y: y + randomFn() * columnIndex * distortionFactor
    }))
  );
}

export function createGrid(xSize, ySize, step) {
  const grid = [];
  for (let i = 0; i < Math.floor(ySize / step); i += 1) {
    if (!grid[i]) {
      grid[i] = [];
    }
    for (let j = 0; j < Math.floor(xSize / step); j += 1) {
      grid[i][j] = { x: j * step, y: i * step };
    }
  }
  return grid;
}
