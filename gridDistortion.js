import gaussianRandom from "./gaussianRandom";
import { createGrid, distortGrid } from "./grid";

const CANVAS_DIMENSION = 1000;
const DISTORTION_FACTOR = 1.1;
const LINES_PER_DIMENSION = 300;

export default function() {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_DIMENSION;
  canvas.height = CANVAS_DIMENSION;

  const ctx = canvas.getContext("2d");

  const grid = distortGrid(
    createGrid(
      CANVAS_DIMENSION,
      CANVAS_DIMENSION,
      CANVAS_DIMENSION / LINES_PER_DIMENSION
    ),
    DISTORTION_FACTOR,
    gaussianRandom
  );

  ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);
  drawGrid(ctx, grid);

  // setInterval(() => {
  //   grid = distortGrid(grid, DISTORTION_FACTOR, gaussianRandom);
  //   ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);
  //   drawGrid(ctx, grid);
  // }, 1000 / 60);
}

function drawPathThrough(ctx, [firstPoint, ...restPoints]) {
  ctx.beginPath();
  ctx.moveTo(firstPoint.x, firstPoint.y);
  for (let { x, y } of restPoints) {
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawGrid(ctx, grid) {
  for (const column of grid) {
    drawPathThrough(ctx, column);
  }
  const rows = grid.reduce((acc, column) => {
    for (let i = 0; i < column.length; i += 1) {
      acc[i].push(column[i]);
    }
    return acc;
  }, [...Array(grid[0].length)].map(() => []));
  for (const row of rows) {
    drawPathThrough(ctx, row);
  }
}
