import { MoveRight, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Matrix } from "@/utils/shape";

type ShapeControlsProps = {
  parallelogram: Matrix;
  line: number[];
  onParallelogramChange: (row: number, col: number, value: number) => void;
  onLineChange: (index: number, value: number) => void;
  onDraw: () => void;
  onStartMotion: () => void;
};

const VERTICES = ["A", "B", "C"] as const;

function parseNumber(raw: string) {
  if (raw.trim() === "") return 0;
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

export function ShapeControls({
  parallelogram,
  line,
  onParallelogramChange,
  onLineChange,
  onDraw,
  onStartMotion,
}: ShapeControlsProps) {
  return (
    <div className="flex w-full flex-col gap-3 lg:w-80">
      <Card>
        <CardHeader>
          <CardTitle>Вершини</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Точку D обчислює програма: D = A + C − B.
          </p>
          {VERTICES.map((name, row) => (
            <div key={name} className="grid grid-cols-[1.5rem_1fr_1fr] items-center gap-2">
              <Label>{name}</Label>
              <Input
                type="number"
                aria-label={`${name} X`}
                value={parallelogram[row][0]}
                onChange={(event) =>
                  onParallelogramChange(row, 0, parseNumber(event.target.value))
                }
              />
              <Input
                type="number"
                aria-label={`${name} Y`}
                value={parallelogram[row][1]}
                onChange={(event) =>
                  onParallelogramChange(row, 1, parseNumber(event.target.value))
                }
              />
            </div>
          ))}
          <div className="grid grid-cols-[1.5rem_1fr_1fr] items-center gap-2 text-xs text-muted-foreground">
            <span />
            <span>X</span>
            <span>Y</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Пряма y = ax + b</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="line-a">a</Label>
            <Input
              id="line-a"
              type="number"
              value={line[0]}
              onChange={(event) => onLineChange(0, parseNumber(event.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="line-b">b</Label>
            <Input
              id="line-b"
              type="number"
              value={line[1]}
              onChange={(event) => onLineChange(1, parseNumber(event.target.value))}
            />
          </div>
        </CardContent>
      </Card>
      <Button onClick={onDraw}>
        <PenLine data-icon="inline-start" />
        Намалювати паралелограм
      </Button>
      <Button variant="secondary" onClick={onStartMotion}>
        <MoveRight data-icon="inline-start" />
        Почати рух
      </Button>
    </div>
  );
}
