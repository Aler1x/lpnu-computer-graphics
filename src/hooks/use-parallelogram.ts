import { useState } from "react";
import { Shape, type Matrix } from "@/utils/shape";

const INITIAL_PARALLELOGRAM: Matrix = [
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
  [0, 0, 1],
];

function calculateFourthPoint(vertices: Matrix): [number, number, number] {
  const A = vertices[0];
  const B = vertices[1];
  const C = vertices[2];
  return [+A[0] + +C[0] - B[0], +A[1] + +C[1] - B[1], 1];
}

function isOnTheSameLine(points: Matrix) {
  if (points.length < 3) return true;

  const getSlope = (p1: number[], p2: number[]) => {
    if (p2[0] - p1[0] === 0) return Infinity;
    return (p2[1] - p1[1]) / (p2[0] - p1[0]);
  };

  const baseSlope = getSlope(points[0], points[1]);
  for (let i = 2; i < points.length; i++) {
    if (getSlope(points[0], points[i]) !== baseSlope) return false;
  }
  return true;
}

export function useParallelogram() {
  const [parallelogram, setParallelogram] = useState<Matrix>(
    INITIAL_PARALLELOGRAM,
  );
  const [line, setLine] = useState<number[]>([0, 0]);

  const onParallelogramChange = (row: number, col: number, value: number) => {
    setParallelogram((prev) => {
      const next = prev.map((r) => [...r] as [number, number, number]);
      next[row][col] = value;
      return next;
    });
  };

  const onLineChange = (index: number, value: number) => {
    setLine((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const draw = () => {
    const A = parallelogram[0];
    const B = parallelogram[1];
    const C = parallelogram[2];
    const D = calculateFourthPoint(parallelogram);
    setParallelogram([A, B, C, D]);
    if (isOnTheSameLine(parallelogram)) return;
  };

  const startMotion = () => {
    const shape = new Shape(parallelogram);
    shape.mirrorAcrossLineAndTransform(line, 10);
    setParallelogram(shape.verticesMatrix);
  };

  return {
    parallelogram,
    line,
    onParallelogramChange,
    onLineChange,
    draw,
    startMotion,
  };
}
