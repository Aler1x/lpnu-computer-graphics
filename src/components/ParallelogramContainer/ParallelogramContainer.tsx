import { useEffect, useRef } from "react";
import type { Point } from "../../utils/shape";

interface ParallelogramContainerProps {
  points: Point[]
}

// TODO: use shape.ts
// TODO: add drawParallelogram

export const ParallelogramContainer = ({
  points = [
    { x: 0, y: 100 },
    { x: 200, y: 100 },
    { x: 300, y: 200 },
    { x: 100, y: 200 },
  ],
}: ParallelogramContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasWidth = 1100;
  const canvasHeight = 600;



  const drawGrid = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 0.125;
    for (let i = 0; i < canvasWidth; i += 10) {
      context.moveTo(i, 0);
      context.lineTo(i, canvasHeight);
    }
    for (let i = 0; i < canvasHeight; i += 10) {
      context.moveTo(0, i);
      context.lineTo(canvasWidth, i);
    }
    context.stroke();
  };

  const clearCanvas = (context: CanvasRenderingContext2D) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  const drawCoordinateSystem = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);
    context.stroke();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        clearCanvas(context);
        drawGrid(context);
        drawCoordinateSystem(context);
        drawParallelogram(context);
      }
    }
  }, []);

  const drawParallelogram = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.moveTo(points[0].x + canvasWidth / 2, -points[0].y + canvasHeight / 2);
    context.lineTo(points[1].x + canvasWidth / 2, -points[1].y + canvasHeight / 2);
    context.lineTo(points[2].x + canvasWidth / 2, -points[2].y + canvasHeight / 2);
    context.lineTo(points[3].x + canvasWidth / 2, -points[3].y + canvasHeight / 2);
    context.lineTo(points[0].x + canvasWidth / 2, -points[0].y + canvasHeight / 2);
    context.stroke();
  }

  return (
    <div className="flex justify-center items-center bg-gray-300 rounded-lg">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
};
