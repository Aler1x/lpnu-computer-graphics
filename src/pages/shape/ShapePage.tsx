import { useState } from "react";
import { ParallelogramContainer } from "../../components/ParallelogramContainer/ParallelogramContainer";
import ShapeParametersInput from "../../components/ShapeParametersInput/ShapeParametersInput";
import TabHeader from "../../components/TabHeader/TabHeader";
import { Geometry } from "../../icons/Geometry";
import "./ShapePage.css";

// TODO fix ParallelogramContainer

const ShapePage = () => {
  const [parallelogram, setParallelogram] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0]])
  const [line, setLine] = useState<number[]>([0, 0]);

  const onButtonClick = () => {
    console.log(parallelogram);
    console.log(line);
  }

  function findFourthPoint(A: number[], B: number[], C: number[]) {
    return [
      B[0] + C[0] - A[0],
      B[1] + C[1] - A[1]
    ];
}

  const onDrawButtonClick = () => {
    const A = parallelogram[0];
    const B = parallelogram[1];
    const C = parallelogram[2];
    const D = findFourthPoint(A, B, C);
    setParallelogram([A, B, C, D]);
  }

  return (
    <div className="p-8">
      <TabHeader title="Взаємодія з паралелограмом 🔷" />
      <div className="flex flex-row gap-28">
        <ParallelogramContainer
          parallelogram={parallelogram}
          line={line}
        />
        <div className="flex flex-col gap-4">
        <ShapeParametersInput
          parallelogram={parallelogram}
          line={line}
         />
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
