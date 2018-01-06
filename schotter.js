const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 700;
const CANVAS_MARGIN = 40;
const SQUARES_PER_ROW = 12;

export default function() {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 0.75;
  ctx.strokeStyle = "black";

  const squareSize = Math.floor(
    (CANVAS_WIDTH - CANVAS_MARGIN * 2) / SQUARES_PER_ROW
  );
  const numRows = Math.floor((CANVAS_HEIGHT - CANVAS_MARGIN * 2) / squareSize);

  function drawSquare(x, y, rotation) {
    // push the unadulterated context to retrieve later
    ctx.save();
    // move the origin to the middle of the square
    ctx.translate(x + squareSize / 2, y + squareSize / 2);
    // rotate around the new origin
    ctx.rotate(rotation);
    // draw the rectangle (keeping in mind where the origin is now)
    ctx.strokeRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
    // restore the previous context
    ctx.restore();
  }

  function schotter() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let row = 0; row < numRows; row += 1) {
      for (let col = 0; col < SQUARES_PER_ROW; col += 1) {
        let rotationDirection = Math.random() < 0.5 ? 1 : -1;
        let xDisplacement = Math.random() * row * 1.2;
        let yDisplacement = Math.random() * row * 1.2;
        drawSquare(
          CANVAS_MARGIN + col * squareSize + xDisplacement,
          CANVAS_MARGIN + row * squareSize + yDisplacement,
          Math.random() * row * 0.05 * rotationDirection
        );
      }
    }
  }

  schotter();
}
