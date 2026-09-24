import { useState } from "react";
import NewtonFractal from "@/components/fractals/NewtonFractal";
import VicsekFractal from "@/components/fractals/VicsekFractal";
import { FractalSettings } from "@/components/fractals/fractal-settings";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import {
  FRACTALS,
  type FractalColor,
  type FractalId,
} from "@/lib/fractals";

export default function FractalsPage() {
  const [fractalId, setFractalId] = useState<FractalId>("newton");
  const [iterationsByFractal, setIterationsByFractal] = useState<
    Record<FractalId, number>
  >({
    newton: FRACTALS[0].defaultIterations,
    vicsek: FRACTALS[1].defaultIterations,
  });
  const [color, setColor] = useState<FractalColor>("yellow");

  const fractal = FRACTALS.find((item) => item.id === fractalId) ?? FRACTALS[0];
  const iterations = iterationsByFractal[fractalId];

  const setIterations = (value: number) => {
    setIterationsByFractal((prev) => ({ ...prev, [fractalId]: value }));
  };

  return (
    <section>
      <PageHeader
        title="Фрактали"
        badge={fractal.name}
        description="Два алгоритми на WebGL. Параметри змінюють той самий рендер, що й раніше: ітерації, колір, миша для Ньютона і масштаб для Вічека."
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <Card className="min-w-0 flex-1 overflow-hidden p-2">
          {fractalId === "newton" ? (
            <NewtonFractal
              iterations={iterations}
              hueColor={color}
              width="1000"
              height="500"
              className="h-auto w-full touch-none rounded-lg bg-black"
            />
          ) : (
            <VicsekFractal
              iterations={iterations}
              color={color}
              width="800"
              height="800"
              className="aspect-square h-auto w-full touch-none rounded-lg"
            />
          )}
        </Card>
        <FractalSettings
          fractalId={fractalId}
          onFractalChange={setFractalId}
          iterations={iterations}
          onIterationsChange={setIterations}
          steps={fractal.steps}
          max={fractal.max}
          color={color}
          onColorChange={setColor}
        />
      </div>
    </section>
  );
}
