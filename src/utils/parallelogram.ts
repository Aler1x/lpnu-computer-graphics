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
