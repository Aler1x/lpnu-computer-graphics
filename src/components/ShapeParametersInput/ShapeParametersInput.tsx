import { Parallelogram } from "../../icons/Paralelogram"
import { Line } from "../../icons/Line";
import { toast } from "react-toastify";
import "./ShapeParametersInput.css";

interface ShapeParametersInputProps {
  parallelogram: number[][];
  line: number[];
}

const ShapeParametersInput = ({ parallelogram, line }: ShapeParametersInputProps) => {

  const onParallelogramClick = () => {
    toast.success("Вітаю ви знайшли таємну кнопку");
  }

  return (
    <div className="flex flex-col color">
      <div className="px-4">
        <div onClick={onParallelogramClick}>
          <Parallelogram />
        </div>
        <div>
          <div className="flex flex-row p-4 gap-2">
            A
            <div className="flex flex-row gap-4">
              <label>X</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => { parallelogram[0][0] = Number(e.target.value) }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => { parallelogram[0][1] = Number(e.target.value) }}
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
                onChange={(e) => { parallelogram[1][0] = Number(e.target.value) }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => { parallelogram[1][1] = Number(e.target.value) }}
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
                onChange={(e) => { parallelogram[2][0] = Number(e.target.value) }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => { parallelogram[2][1] = Number(e.target.value) }}
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
            onChange={(e) => { line[0] = Number(e.target.value) }}
            className="w-24 input p-1"
          />
        </div>
        <div className="flex flex-row p-4 gap-4">
          <label>B</label>
          <input
            type="text"
            placeholder="0"
            onChange={(e) => { line[1] = Number(e.target.value) }}
            className="w-24 input p-1"
          />
        </div>
      </div>
    </div>
  );
}

export default ShapeParametersInput;
