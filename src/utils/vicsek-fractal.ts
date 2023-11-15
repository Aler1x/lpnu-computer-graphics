export function start(ctx: CanvasRenderingContext2D, iterationsCount: number): void {
  const size = ctx.canvas.width
  drawFractal(ctx, iterationsCount, 0, 0, size);
}

function drawFractal(ctx: CanvasRenderingContext2D, levels: number, x: number = 0, y: number = 0, size: number = 300) {
  if (levels === 0) {
      ctx.fillStyle = 'navy';
      ctx.fillRect(x, y, size, size);
  } else {
      const size3 = size / 3;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if ((i + j) % 2 === 0) {
                  drawFractal(ctx, levels - 1, x + i * size3, y + j * size3, size3);
              }
          }
      }
  }
}
