import { Parallelogram } from "../../icons/Paralelogram"
import { Line } from "../../icons/Line";
import "./ShapeParametersInput.css";

const ShapeParametersInput = () => {
  const parallelogram: number[][] = [[0, 0], [0, 0], [0, 0]] as number[][];
  const line: number[] = [0, 0] as number[];

  return (
    <div className="flex flex-col color">
      <div className="px-4">
        <Parallelogram />
        <div>
          <div className="flex flex-row p-4 gap-2">
            A
            <div className="flex flex-row gap-4">
              <label>X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[0][0]}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[0][1]}
                className="w-24 input p-1"
              />
            </div>
          </div>
          <div className="flex flex-row p-4 gap-2">
            B
            <div className="flex flex-row gap-4">
              <label>X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[1][0]}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[1][1]}
                className="w-24 input p-1"
              />
            </div>
          </div>
          <div className="flex flex-row p-4 gap-2">
            C
            <div className="flex flex-row gap-4">
              <label>X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[2][0]}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[2][1]}
                className="w-24 input p-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <Line />
        <div className="flex flex-row p-4 gap-4">
          <label>A</label>
          <input
            type="text"
            placeholder="0"
            value={line[0]}
            className="w-24 input p-1"
          />
        </div>
        <div className="flex flex-row p-4 gap-4">
          <label>B</label>
          <input
            type="text"
            placeholder="0"
            value={line[1]}
            className="w-24 input p-1"
          />
        </div>
      </div>
    </div>
  );
}

export default ShapeParametersInput;
