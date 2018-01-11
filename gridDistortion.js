import React from "react";
import gaussianRandom from "./gaussianRandom";
import { createGrid, distortGrid } from "./grid";

const CANVAS_DIMENSION = 1000;
const DISTORTION_FACTOR = 1.1;
const LINES_PER_DIMENSION = 300;
const DEFAULT_FPS = 60;

let fps = DEFAULT_FPS;

export default function gridDistortion() {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_DIMENSION;
  canvas.height = CANVAS_DIMENSION;

  const ctx = canvas.getContext("2d");

  let grid = distortGrid(
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

  let intervalHandle = setInterval(() => {
    grid = distortGrid(grid, DISTORTION_FACTOR, gaussianRandom);
    ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);
    drawGrid(ctx, grid);
  }, 1000 / DEFAULT_FPS);

  function teardown() {
    clearInterval(intervalHandle);
  }

  return {
    teardown,
    UI() {
      return (
        <div>
          <label>
            <span>FPS</span>
            <input
              type="number"
              defaultValue={DEFAULT_FPS}
              onChange={({ target }) => {
                const parsed = parseFloat(target.value);
                if (!parsed) return; // zero or NaN
                fps = parsed;
                teardown();
                gridDistortion();
              }}
            />
          </label>
        </div>
      );
    }
  };
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
