import { HintPopover } from "@/components/layout/hint-popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FRACTAL_COLOR_LABELS,
  FRACTAL_COLORS,
  FRACTALS,
  type FractalColor,
  type FractalId,
} from "@/lib/fractals";

type FractalSettingsProps = {
  fractalId: FractalId;
  onFractalChange: (id: FractalId) => void;
  iterations: number;
  onIterationsChange: (value: number) => void;
  steps: number;
  max: number;
  color: FractalColor;
  onColorChange: (color: FractalColor) => void;
};

function sliderValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

export function FractalSettings({
  fractalId,
  onFractalChange,
  iterations,
  onIterationsChange,
  steps,
  max,
  color,
  onColorChange,
}: FractalSettingsProps) {
  const fractal = FRACTALS.find((item) => item.id === fractalId) ?? FRACTALS[0];

  return (
    <div className="flex w-full flex-col gap-3 lg:w-72">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Фрактал</CardTitle>
            <HintPopover label="Як керувати фракталом">{fractal.hint}</HintPopover>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={fractalId}
            onValueChange={(value) => onFractalChange(value as FractalId)}
          >
            <TabsList className="grid w-full grid-cols-2">
              {FRACTALS.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.id === "newton" ? "Ньютон" : "Вічек"}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ітерації</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <Label htmlFor="iterations">Глибина</Label>
            <span className="font-medium tabular-nums">
              {iterations.toFixed(0)}
            </span>
          </div>
          <Slider
            id="iterations"
            min={0}
            max={max}
            step={max / steps}
            value={[iterations]}
            onValueChange={(value) => onIterationsChange(sliderValue(value))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Колір</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {FRACTAL_COLORS.map((swatch) => {
              const selected = swatch === color;
              return (
                <button
                  key={swatch}
                  type="button"
                  aria-label={FRACTAL_COLOR_LABELS[swatch]}
                  aria-pressed={selected}
                  title={FRACTAL_COLOR_LABELS[swatch]}
                  onClick={() => onColorChange(swatch)}
                  className={`size-8 rounded-lg ring-offset-2 ring-offset-card transition ${
                    selected ? "ring-2 ring-foreground" : "ring-1 ring-border"
                  }`}
                  style={{ background: swatch }}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
