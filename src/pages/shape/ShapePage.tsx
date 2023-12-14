import { useState } from "react";
import { ParallelogramContainer } from "../../components/ParallelogramContainer/ParallelogramContainer";
import ShapeParametersInput from "../../components/ShapeParametersInput/ShapeParametersInput";
import TabHeader from "../../components/TabHeader/TabHeader";
import { Geometry } from "../../icons/Geometry";
import "./ShapePage.css";

// TODO fix ShapeParametersInput
// TODO fix ParallelogramContainer

const ShapePage = () => {
  const [parallelogram, setParallelogram] = useState<number[][]>([[0, 0], [0, 0], [0, 0], [0, 0]])
  const [line, setLine] = useState<number[]>([0, 0]);

  const onButtonClick = () => {
    console.log(parallelogram);
    console.log(line);
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
        <button className="button" onClick={onButtonClick}>
          <Geometry />
          Почати
        </button>
        </div>
      </div>
    </div>
  );
};

export default ShapePage;
