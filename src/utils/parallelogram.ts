import {
  Line,
  Point,
} from "../components/ParallelogramContainer/ParallelogramContainer";

export const findPointD = (
  pointA: Point,
  pointB: Point,
  pointC: Point
): Point => {
  const vectorBA = {
    x: pointA.x - pointB.x,
    y: pointA.y - pointB.y,
  };

  const pointD = {
    x: pointC.x + vectorBA.x,
    y: pointC.y + vectorBA.y,
  };

  return pointD;
};

export const mirrorPoint = (point: Point, line: Line): Point => {
  const mirroredX =
    (point.x * (1 - line.a * line.a) +
      2 * line.a * point.y -
      2 * line.a * line.b) /
    (1 + line.a * line.a);
  const mirroredY =
    (2 * line.a * point.x + (1 + line.a * line.a) * point.y + 2 * line.b) /
    (1 + line.a * line.a);

  return { x: mirroredX, y: mirroredY };
};

export const drawLine = (a: number, b: number, canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  if (!context) {
    console.error("couldn't load canvas for drawLine");
    return;
  }

  context.strokeStyle = "red";
  context.lineWidth = 2;

  // Calculate the coordinates for the line
  const xStart = -center.x; // Adjust for the center of the canvas
  const xEnd = center.x;

  // Calculate y-coordinates using the equation y = ax + b
  const yStart = a * xStart + b;
  const yEnd = a * xEnd + b;

  // Draw the line
  context.beginPath();
  const startPoint = { x: center.x + xStart, y: center.y - yStart }; // Adjust for the center of the canvas
  const endPoint = { x: center.x + xEnd, y: center.y - yEnd };
  context.moveTo(startPoint.x, startPoint.y);
  context.lineTo(endPoint.x, endPoint.y);
  context.stroke();
};
