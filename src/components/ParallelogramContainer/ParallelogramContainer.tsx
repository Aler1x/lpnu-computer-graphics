import React, { useEffect, useRef, useState } from "react";
import { findPointD, mirrorPoint } from "../../utils/parallelogram";

export type Point = { x: number; y: number };

export type Line = {
  a: number; // Coefficient 'a' of the line equation (y = ax + b)
  b: number; // Coefficient 'b' of the line equation (y = ax + b)
};

interface ParallelogramContainerProps {
  pointA: Point;
  pointB: Point;
  pointC: Point;
  lineA: number;
  lineB: number;
}

export const ParallelogramContainer = ({
  pointA,
  pointB,
  pointC,
  lineA,
  lineB,
}: ParallelogramContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 800;
  const canvasHeight = 500;
  const [reflectionLine, setReflectionLine] = useState({ a: lineA, b: lineB });
  const pointD = findPointD(pointA, pointB, pointC);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawAxes(ctx, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes(ctx, canvas.width, canvas.height);

    const mirroredPointA = mirrorPoint(pointA, reflectionLine);
    const mirroredPointB = mirrorPoint(pointB, reflectionLine);
    const mirroredPointC = mirrorPoint(pointC, reflectionLine);
    const mirroredPointD = mirrorPoint(pointD, reflectionLine);

    drawParallelogram(
      ctx,
      mirroredPointA,
      mirroredPointB,
      mirroredPointC,
      mirroredPointD
    );
  }, [pointA, pointB, pointC, pointD, reflectionLine]);

  const drawAxes = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw X axis
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Draw Y axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  };

  const drawParallelogram = (
    ctx: CanvasRenderingContext2D,
    pointA: Point,
    pointB: Point,
    pointC: Point,
    pointD: Point
  ) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Draw lines connecting the points
    ctx.beginPath();
    ctx.moveTo(centerX + pointA.x, centerY - pointA.y);
    ctx.lineTo(centerX + pointB.x, centerY - pointB.y);
    ctx.lineTo(centerX + pointC.x, centerY - pointC.y);
    ctx.lineTo(centerX + pointD.x, centerY - pointD.y);
    ctx.closePath();
    ctx.stroke();
  };

  const handleLineInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReflectionLine((prevLine) => ({
      ...prevLine,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 rounded-lg">
      <div className="mb-4">
        <label className="mr-2">Enter line coefficients:</label>
        <input
          type="text"
          name="a"
          placeholder="a"
          onChange={handleLineInput}
        />
        <input
          type="text"
          name="b"
          placeholder="b"
          onChange={handleLineInput}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </div>
  );
};
