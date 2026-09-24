import { useRef, type ReactNode } from "react";
import { ImagePlus } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useColorLab } from "@/hooks/use-color-lab";

function sliderValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ColorsPage() {
  const originCanvas = useRef<HTMLCanvasElement>(null);
  const editingCanvas = useRef<HTMLCanvasElement>(null);
  const lab = useColorLab(originCanvas, editingCanvas);
  const hoveredColorRGB = `rgb(${lab.rgbValues.r}, ${lab.rgbValues.g}, ${lab.rgbValues.b})`;

  return (
    <section>
      <PageHeader
        title="Кольори та кольорові схеми"
        description="Завантажте зображення, змініть світлість і насиченість, виділіть область на оригіналі або застосуйте CMYK. Наведення показує колір пікселя."
      />
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="grid gap-4 md:grid-cols-2">
            <ImagePane
              title="Оригінальне зображення"
              empty={!lab.fileName}
              maxSize={lab.maxImageSize}
            >
              <canvas
                ref={originCanvas}
                width={500}
                height={500}
                className="h-auto max-w-full"
                style={{ maxHeight: lab.maxImageSize }}
                onMouseDown={lab.handleMouseDown}
                onMouseMove={lab.handleMouseMove}
                onMouseEnter={() => lab.setHoverVisible(true)}
                onMouseLeave={() => lab.setHoverVisible(false)}
                onMouseUp={lab.handleMouseUp}
                draggable={false}
              />
              {lab.showSelection ? (
                <div
                  className="pointer-events-none absolute border-2 border-dashed border-destructive"
                  style={{
                    left: Math.min(lab.selectionStart.x, lab.selectionEnd.x),
                    top: Math.min(lab.selectionStart.y, lab.selectionEnd.y),
                    width: Math.abs(lab.selectionEnd.x - lab.selectionStart.x),
                    height: Math.abs(lab.selectionEnd.y - lab.selectionStart.y),
                  }}
                />
              ) : null}
            </ImagePane>
            <ImagePane
              title="Відредаговане зображення"
              empty={!lab.fileName}
              maxSize={lab.maxImageSize}
            >
              <canvas
                ref={editingCanvas}
                width={500}
                height={500}
                className="h-auto max-w-full"
                style={{ maxHeight: lab.maxImageSize }}
                onMouseMove={lab.handleMouseMove}
                onMouseEnter={() => lab.setHoverVisible(true)}
                onMouseLeave={() => lab.setHoverVisible(false)}
                draggable={false}
              />
            </ImagePane>
          </div>
          {lab.imageSrc ? (
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                HSL {lab.hslValues.h.toFixed(0)}°, {lab.hslValues.s.toFixed(0)}%,{" "}
                {lab.hslValues.l.toFixed(0)}%
              </Badge>
              <Badge variant="outline">{hoveredColorRGB}</Badge>
              <Badge variant="outline">
                CMYK {lab.cmykValues.c.toFixed(2)} {lab.cmykValues.m.toFixed(2)}{" "}
                {lab.cmykValues.y.toFixed(2)} {lab.cmykValues.k.toFixed(2)}
              </Badge>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Оберіть зображення, щоб змінювати кольори.
            </p>
          )}
        </div>

        <Card className="w-full xl:w-72">
          <CardHeader>
            <CardTitle>Корекція</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="sr-only"
                onChange={lab.handleImageUpload}
              />
              <label
                htmlFor="image-upload"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                <ImagePlus data-icon="inline-start" />
                Додати картинку
              </label>
              {lab.fileName ? (
                <p className="mt-2 truncate text-xs text-muted-foreground">
                  {lab.fileName}
                </p>
              ) : null}
            </div>
            <Adjustment
              id="lightness"
              title="Світота"
              value={lab.lightness}
              onChange={lab.setLightness}
            />
            <Adjustment
              id="saturation"
              title="Насиченість"
              value={lab.saturation}
              onChange={lab.setSaturation}
            />
            <Button
              className="w-full"
              disabled={!lab.imageSrc}
              onClick={lab.handleCmykChange}
            >
              Застосувати CMYK
            </Button>
          </CardContent>
        </Card>
      </div>
      {lab.showHoverSquare ? (
        <div
          className="pointer-events-none fixed z-50 size-5 rounded-md border border-foreground"
          style={{
            backgroundColor: hoveredColorRGB,
            left: `${lab.cursorPos.x + 12}px`,
            top: `${lab.cursorPos.y + 12}px`,
          }}
        />
      ) : null}
    </section>
  );
}

function ImagePane({
  title,
  empty,
  maxSize,
  children,
}: {
  title: string;
  empty: boolean;
  maxSize: number;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {empty ? (
          <div
            className="grid place-items-center rounded-lg border border-dashed bg-muted/50 p-4 text-center text-sm text-muted-foreground"
            style={{ minHeight: 200, maxWidth: maxSize }}
          >
            Завантажте картинку кнопкою «Додати картинку»
          </div>
        ) : (
          <div className="relative" style={{ maxWidth: maxSize }}>
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Adjustment({
  id,
  title,
  value,
  onChange,
}: {
  id: string;
  title: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id}>{title}</Label>
        <span className="text-sm tabular-nums">{value.toFixed(2)}</span>
      </div>
      <Slider
        id={id}
        min={0}
        max={2}
        step={2 / 40}
        value={[value]}
        onValueChange={(next) => onChange(sliderValue(next))}
      />
    </div>
  );
}
