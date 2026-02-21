import TabHeader from "@/components/TabHeader";
import NewtonFractal from "@/components/fractals/NewtonFractal";
import VicsekFractal from "@/components/fractals/VicsekFractal";
import FractalSettings from "@/components/fractals/Settings";
import { useState } from "react";

const colors = ["yellow", "green", "blue", "purple", "red"] as const;

const FRACTAL_NAMES = ["Фрактал Ньютона", "Фрактал Вічека"] as const;
const STEPS = [20, 10];
const MAX = [100, 10];

const FractalPage = () => {
  const [currentFractalIndex, setCurrentFractalIndex] = useState(0);
  const [iterationsByFractal, setIterationsByFractal] = useState<
    [number, number]
  >([50, 5]);
  const [colorIndex, setColorIndex] = useState(0);

  const currentFractalName = FRACTAL_NAMES[currentFractalIndex];
  const steps = STEPS[currentFractalIndex];
  const max = MAX[currentFractalIndex];
  const iterations = iterationsByFractal[currentFractalIndex];
  const setIterations = (value: number | ((prev: number) => number)) => {
    setIterationsByFractal((prev) => {
      const next = [...prev] as [number, number];
      next[currentFractalIndex] =
        typeof value === "function" ? value(prev[currentFractalIndex]) : value;
      return next;
    });
  };

  return (
    <>
      <TabHeader title="Фрактали 🌀" subtitle={currentFractalName} />
      <div className="flex md:flex-row flex-col gap-4">
        {currentFractalIndex === 0 ? (
          <NewtonFractal
            iterations={iterations}
            hueColor={colors[colorIndex]}
            width="1000"
            height="500"
            className="w-full h-full rounded-2xl"
          />
        ) : (
          <VicsekFractal iterations={iterations} color={colors[colorIndex]}
            width="500"
            height="500"
            className="w-full h-full rounded-2xl border border-black"
          />
        )}
        <FractalSettings
          currentFractalIndex={currentFractalIndex}
          setCurrentFractalIndex={setCurrentFractalIndex}
          iterations={iterations}
          setIterations={setIterations}
          steps={steps}
          max={max}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
          colors={colors}
        />
      </div>
    </>
  );
};

export default FractalPage;
