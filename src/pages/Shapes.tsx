import { useRef, useState } from "react";
import { ParallelogramContainer } from "@/components/figures/ParallelogramContainer";
import ShapeParametersInput from "@/components/figures/ShapeParametersInput";
import TabHeader from "@/components/TabHeader";
import Geometry from "@/assets/icons/geometry.svg?react";
import { type Matrix, Shape } from "@/utils/shape";

const ShapePage = () => {
  const [parallelogram, setParallelogram] = useState<Matrix>([
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ]);
  const [line, setLine] = useState<number[]>([0, 0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Initialize the Shape with the parallelogram vertices
  const myShape = new Shape(parallelogram);

  const onButtonClick = () => {
    myShape.mirrorAcrossLineAndTransform(line, 10);
    setParallelogram(myShape.verticesMatrix);
  };

  function calculateFourthPoint(vertices: Matrix) {
    const A = vertices[0];
    const B = vertices[1];
    const C = vertices[2];
    const D: [number, number, number] = [
      +A[0] + +C[0] - B[0],
      +A[1] + +C[1] - B[1],
      1,
    ];
    return D;
  }

  const onDrawButtonClick = () => {
    const A = parallelogram[0];
    const B = parallelogram[1];
    const C = parallelogram[2];
    const D = calculateFourthPoint(parallelogram);
    setParallelogram([A, B, C, D]);
    if (isOnTheSameLine(parallelogram)) {
      return;
    }
  };

  function isOnTheSameLine(points: Matrix) {
    if (points.length < 3) {
      return true; // Less than 3 points are always on the same line
    }

    const getSlope = (p1: number[], p2: number[]) => {
      if (p2[0] - p1[0] === 0) return Infinity; // Avoid division by zero
      return (p2[1] - p1[1]) / (p2[0] - p1[0]);
    };

    const baseSlope = getSlope(points[0], points[1]);

    for (let i = 2; i < points.length; i++) {
      if (getSlope(points[0], points[i]) !== baseSlope) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="p-8">
      <TabHeader title="Взаємодія з паралелограмом 🔷" />
      <div className="flex flex-row gap-6">
        <ParallelogramContainer
          parallelogram={parallelogram}
          line={line}
          canvasRef={canvasRef}
        />
        <div className="flex flex-col gap-2">
          <ShapeParametersInput
            parallelogram={parallelogram}
            line={line}
            onParallelogramChange={onParallelogramChange}
            onLineChange={onLineChange}
          />
          <button className="bg-[#2C3639] rounded-xl text-[#DCD7C9] flex justify-center items-center gap-2.5 text-sm font-medium p-2" onClick={onDrawButtonClick}>
            <Geometry className="size-12" />
            Намалювати паралелограм
          </button>
          <button className="bg-[#2C3639] rounded-xl text-[#DCD7C9] flex justify-center items-center gap-2.5 text-sm font-medium p-2" onClick={onButtonClick}>
            <Geometry className="size-12" />
            Почати рух
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShapePage;
