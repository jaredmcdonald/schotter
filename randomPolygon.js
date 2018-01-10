import gaussianRandom from "./gaussianRandom";

const CANVAS_DIMENSION = 700;
const NUM_VERTICES = 100;

function buildVertices() {
  const vertices = [];
  for (let i = 0; i < NUM_VERTICES; i += 1) {
    vertices.push({
      x: gaussianRandom() * CANVAS_DIMENSION,
      y: gaussianRandom() * CANVAS_DIMENSION
    });
  }
  return vertices;
}

export default function randomPolygon() {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_DIMENSION;
  canvas.height = CANVAS_DIMENSION;

  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 0.75;
  ctx.strokeStyle = "black";

  ctx.clearRect(0, 0, CANVAS_DIMENSION, CANVAS_DIMENSION);

  const vertices = buildVertices();

  ctx.beginPath();
  const { x: initialX, y: initialY } = vertices[0];
  ctx.moveTo(initialX, initialY);
  for (const { x, y } of vertices.slice(1)) {
    ctx.lineTo(x, y);
  }
  ctx.lineTo(initialX, initialY);
  ctx.stroke();

  return { teardown() {} }; // noop, for now
}
