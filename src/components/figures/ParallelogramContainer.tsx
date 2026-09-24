import { useCallback, useEffect } from "react";

interface ParallelogramContainerProps {
  parallelogram: number[][];
  line: number[];
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const ParallelogramContainer = ({
  parallelogram,
  line,
  canvasRef,
}: ParallelogramContainerProps) => {
  const canvasWidth = 500;
  const canvasHeight = 500;

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
  };

  const drawCoordinateSystem = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);
    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);
    context.stroke();
  };

  const drawParallelogram = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.beginPath();
      context.strokeStyle = "red";
      context.lineWidth = 1;
      context.moveTo(
        parallelogram[0][0] + canvasWidth / 2,
        -parallelogram[0][1] + canvasHeight / 2
      );
      context.lineTo(
        parallelogram[1][0] + canvasWidth / 2,
        -parallelogram[1][1] + canvasHeight / 2
      );
      context.lineTo(
        parallelogram[2][0] + canvasWidth / 2,
        -parallelogram[2][1] + canvasHeight / 2
      );
      context.lineTo(
        parallelogram[3][0] + canvasWidth / 2,
        -parallelogram[3][1] + canvasHeight / 2
      );
      context.lineTo(
        parallelogram[0][0] + canvasWidth / 2,
        -parallelogram[0][1] + canvasHeight / 2
      );
      context.stroke();
    },
    [parallelogram]
  );

  const drawLine = useCallback(
    (canvas: HTMLCanvasElement) => {
      const context = canvas.getContext("2d");
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      if (!context) {
        console.error("couldn't load canvas for drawLine");
        return;
      }
      context.strokeStyle = "blue";
      context.lineWidth = 1;

      // Calculate the coordinates for the line
      const xStart = -center.x; // Adjust for the center of the canvas
      const xEnd = center.x;

      // Calculate y-coordinates using the equation y = ax + b
      const yStart = line[0] * xStart + line[1];
      const yEnd = line[0] * xEnd + line[1];

      // Draw the line
      context.beginPath();
      const startPoint = { x: center.x + xStart, y: center.y - yStart }; // Adjust for the center of the canvas
      const endPoint = { x: center.x + xEnd, y: center.y - yEnd };
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);
      context.stroke();
    },
    [line]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        clearCanvas(context);
        drawGrid(context);
        drawCoordinateSystem(context);
        drawLine(canvas);
        drawParallelogram(context);
      }
    }
  }, [drawParallelogram, parallelogram, line, drawLine, canvasRef]);

  return (
    <div className="flex max-h-[500px] max-w-[500px] items-center justify-center overflow-hidden rounded-xl border bg-card shadow-sm">
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};
