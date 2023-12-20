import { useRef, useState } from "react";
import { ParallelogramContainer } from "../../components/ParallelogramContainer/ParallelogramContainer";
import ShapeParametersInput from "../../components/ShapeParametersInput/ShapeParametersInput";
import TabHeader from "../../components/TabHeader/TabHeader";
import { Geometry } from "../../icons/Geometry";
import "./ShapePage.css";
import { Matrix, Shape } from "../../utils/shape";
import { toast } from "react-toastify";

// TODO: add toasts

const ShapePage = () => {
  const [parallelogram, setParallelogram] = useState<Matrix>([
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ]);
  const [line, setLine] = useState<number[]>([0, 0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize the Shape with the parallelogram vertices
  let myShape = new Shape(parallelogram);

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
    myShape = new Shape(parallelogram);
    if (isOnTheSameLine(parallelogram)) {
      toast.error("Це не паралелограм");
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
      <div className="flex flex-row gap-28">
        <ParallelogramContainer
          parallelogram={parallelogram}
          line={line}
          canvasRef={canvasRef}
        />
        <div className="flex flex-col gap-4">
          <ShapeParametersInput parallelogram={parallelogram} line={line} />
          <button className="button" onClick={onDrawButtonClick}>
            <Geometry />
            Намалювати паралелограм
          </button>
          <button className="button" onClick={onButtonClick}>
            <Geometry />
            Почати рух
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShapePage;
