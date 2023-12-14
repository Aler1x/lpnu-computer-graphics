import { useEffect, useRef } from "react";

interface ParallelogramContainerProps {
  parallelogram: number[][];
  line: number[];
}

// TODO: use shape.ts
// TODO: add drawParallelogram which receives array of points

export const ParallelogramContainer = ({
  parallelogram,
  line
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

  const drawParallelogram = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "red";
    context.lineWidth = 1;
    context.moveTo(parallelogram[0][0] + canvasWidth / 2, -parallelogram[0][1] + canvasHeight / 2);
    context.lineTo(parallelogram[1][0] + canvasWidth / 2, -parallelogram[1][1] + canvasHeight / 2);
    context.lineTo(parallelogram[2][0] + canvasWidth / 2, -parallelogram[2][1] + canvasHeight / 2);
    context.lineTo(parallelogram[3][0] + canvasWidth / 2, -parallelogram[3][1] + canvasHeight / 2);
    context.lineTo(parallelogram[0][0] + canvasWidth / 2, -parallelogram[0][0] + canvasHeight / 2);
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
