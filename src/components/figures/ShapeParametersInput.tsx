import Parallelogram from "@/assets/icons/parallelogram.svg?react";
import Line from "@/assets/icons/line.svg?react";
import HelpButton from "@/assets/icons/help.svg?react";
import HelpModal from "@/components/HelpModal";
import { useState } from "react";

interface ShapeParametersInputProps {
  parallelogram: number[][];
  line: number[];
  onParallelogramChange: (row: number, col: number, value: number) => void;
  onLineChange: (index: number, value: number) => void;
}

const ShapeParametersInput = ({
  parallelogram,
  line,
  onParallelogramChange,
  onLineChange,
}: ShapeParametersInputProps) => {
  const [openModal, setOpenModal] = useState(false);

  const onParallelogramClick = () => {
  };

  return (
    <div className="flex flex-col bg-[#2C3639] rounded-xl text-[#DCD7C9] text-sm">
      {openModal && (
        <HelpModal
          setIsOpen={() => setOpenModal(false)}
          />
      )}
      <div className="p-2">
        <div className="flex flex-row justify-between">
          <div
            className="flex flex-col justify-center items-center hover:cursor-pointer"
            onClick={onParallelogramClick}
          >
            <Parallelogram className="size-12" />
          </div>
          <ul className="flex flex-col justify-center items-center space-y-2 font-light gap-5 p-1">
            <HelpButton className="hover:cursor-pointer" onClick={() => setOpenModal(true)} />
          </ul>
        </div>
        <div>
          <div className="flex flex-row p-2 gap-2">
            <label className="text-sm">A</label>
            <div className="flex flex-row gap-4">
              <label className="text-sm">X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[0][0]}
                onChange={(e) => {
                  onParallelogramChange(0, 0, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
              <label className="text-sm">Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[0][1]}
                onChange={(e) => {
                  onParallelogramChange(0, 1, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-row p-2 gap-2">
            <label className="text-sm">B</label>
            <div className="flex flex-row gap-4">
              <label className="text-sm">X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[1][0]}
                onChange={(e) => {
                  onParallelogramChange(1, 0, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
              <label className="text-sm">Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[1][1]}
                onChange={(e) => {
                  onParallelogramChange(1, 1, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-row p-2 gap-2">
            <label className="text-sm">C</label>
            <div className="flex flex-row gap-4">
              <label className="text-sm">X</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[2][0]}
                onChange={(e) => {
                  onParallelogramChange(2, 0, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
              <label className="text-sm">Y</label>
              <input
                type="text"
                placeholder="0"
                value={parallelogram[2][1]}
                onChange={(e) => {
                  onParallelogramChange(2, 1, Number(e.target.value));
                }}
                className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <Line className="size-12" />
        <div className="flex flex-row p-2 gap-4">
          <label className="text-sm">A</label>
          <input
            type="text"
            placeholder="0"
            value={line[0]}
            onChange={(e) => {
              onLineChange(0, Number(e.target.value));
            }}
            className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
          />
        </div>
        <div className="flex flex-row p-2 gap-4">
          <label className="text-sm">B</label>
          <input
            type="text"
            placeholder="0"
            value={line[1]}
            onChange={(e) => {
              onLineChange(1, Number(e.target.value));
            }}
            className="w-24 p-1 text-black bg-[#DCD7C9] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeParametersInput;
