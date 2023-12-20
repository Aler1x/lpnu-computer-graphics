import { Parallelogram } from "../../icons/Paralelogram";
import { Line } from "../../icons/Line";
import { toast } from "react-toastify";
import "./ShapeParametersInput.css";
import HelpModal from "../HelpModal/HelpModal";
import { useState } from "react";
import { SidebarElement } from "../Sidebar/SidebarElement/SidebarElement";

interface ShapeParametersInputProps {
  parallelogram: number[][];
  line: number[];
}

const ShapeParametersInput = ({
  parallelogram,
  line,
}: ShapeParametersInputProps) => {
  const [openModal, setOpenModal] = useState(false);

  const onParallelogramClick = () => {
    toast.success("Вітаю 🎉 Ви знайшли таємну кнопку.");
  };

  return (
    <div className="flex flex-col color">
      {openModal && (
        <HelpModal
          setIsOpen={() => setOpenModal(false)}
          customPage="Parallelogram instructions"
        />
      )}
      <div className="px-4">
        <div className="flex flex-row justify-between">
          <div
            className="flex flex-col justify-center items-center"
            onClick={onParallelogramClick}
          >
            <Parallelogram />
          </div>
          <ul className="flex flex-col justify-center items-center space-y-2 font-light gap-5 p-1">
            <SidebarElement icon={4} onClick={() => setOpenModal(true)} />
          </ul>
        </div>
        <div>
          <div className="flex flex-row p-4 gap-2">
            A
            <div className="flex flex-row gap-4">
              <label>X</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => {
                  parallelogram[0][0] = Number(e.target.value);
                }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => {
                  parallelogram[0][1] = Number(e.target.value);
                }}
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
                onChange={(e) => {
                  parallelogram[1][0] = Number(e.target.value);
                }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => {
                  parallelogram[1][1] = Number(e.target.value);
                }}
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
                onChange={(e) => {
                  parallelogram[2][0] = Number(e.target.value);
                }}
                className="w-24 input p-1"
              />
              <label>Y</label>
              <input
                type="text"
                placeholder="0"
                onChange={(e) => {
                  parallelogram[2][1] = Number(e.target.value);
                }}
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
            onChange={(e) => {
              line[0] = Number(e.target.value);
            }}
            className="w-24 input p-1"
          />
        </div>
        <div className="flex flex-row p-4 gap-4">
          <label>B</label>
          <input
            type="text"
            placeholder="0"
            onChange={(e) => {
              line[1] = Number(e.target.value);
            }}
            className="w-24 input p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeParametersInput;
