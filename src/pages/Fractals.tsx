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
    <section className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader
        title="Фрактали"
        badge={fractal.name}
        description="Два алгоритми на WebGL. Параметри змінюють той самий рендер, що й раніше: ітерації, колір, миша для Ньютона і масштаб для Вічека."
      />
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden lg:flex-row">
        <Card className="relative min-h-0 min-w-0 flex-1 overflow-hidden p-2">
          <div className="relative h-full w-full">
            {fractalId === "newton" ? (
              <NewtonFractal
                iterations={iterations}
                hueColor={color}
                width="1000"
                height="500"
                className="absolute inset-0 m-auto h-auto max-h-full w-full touch-none rounded-lg bg-black"
              />
            ) : (
              <VicsekFractal
                iterations={iterations}
                color={color}
                width="800"
                height="800"
                className="absolute inset-0 m-auto aspect-square h-auto max-h-full w-auto max-w-full touch-none rounded-lg"
              />
            )}
          </div>
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
