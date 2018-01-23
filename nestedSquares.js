import { createGrid } from "./grid";
import gaussianRandom from "./gaussianRandom";

const CANVAS_DIMENSION = 800;
const LINES_PER_DIMENSION = 5;

export default function nestedSquares() {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_DIMENSION;
  canvas.height = CANVAS_DIMENSION;

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "black";
  ctx.strokeWidth = 0.5;

  ctx.fillStyle = "rgba(0, 0, 0, 0.01)";

  const grid = createGrid(
    CANVAS_DIMENSION,
    CANVAS_DIMENSION,
    CANVAS_DIMENSION / LINES_PER_DIMENSION
  );

  ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);
    drawSquaresIntoGrid(grid, ctx);
  }, 100);

  return {
    teardown() {
      ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);
      clearInterval(interval);
    }
  };
}

function drawSquareWithinBounds(ctx, numSquares, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // fill or stroke?
  // ctx.strokeRect(x1, y1, dx, dy);
  ctx.fillRect(x1, y1, dx, dy);

  if (numSquares > 1) {
    const center = [(x1 + x2) / 2, (y1 + y2) / 2];
    const displacement = [
      (0.5 - gaussianRandom()) * dx,
      (0.5 - gaussianRandom()) * dy
    ];
    const newCenter = center.map((coord, index) => coord + displacement[index]);
    const shrinkage = gaussianRandom() * 2;
    const newDx = dx * shrinkage;
    const newDy = dy * shrinkage;

    drawSquareWithinBounds(
      ctx,
      numSquares - 1,
      newCenter[0] - newDx / 2,
      newCenter[1] - newDy / 2,
      newCenter[0] + newDx / 2,
      newCenter[1] + newDy / 2
    );
  }
}

let margin = 10;
function drawSquaresIntoGrid(grid, ctx) {
  for (let columnIndex = 0; columnIndex < grid.length - 1; columnIndex += 1) {
    for (let rowIndex = 0; rowIndex < grid[0].length - 1; rowIndex += 1) {
      const { x: startX, y: startY } = grid[rowIndex][columnIndex];
      const { x: endX, y: endY } = grid[rowIndex + 1][columnIndex + 1];
      drawSquareWithinBounds(
        ctx,
        1000,
        startX + margin,
        startY + margin,
        endX - margin,
        endY - margin
      );
    }
  }
}
