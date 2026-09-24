import { memo, useEffect, useRef } from "react";
import { mountShaderFractal, type ShaderFractalHandle } from "@/utils/shader-fractal";
import type { ShaderFractalDefinition } from "@/lib/fractals";

const COLOR_TO_RGB: Record<string, [number, number, number]> = {
  yellow: [1, 0.85, 0.15],
  green: [0.15, 0.75, 0.35],
  blue: [0.2, 0.45, 1],
  purple: [0.62, 0.28, 0.9],
  red: [0.9, 0.22, 0.2],
};

type ShaderFractalProps = {
  fractal: ShaderFractalDefinition;
  iterations: number;
  color: string;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

function pointerPlane(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left - rect.width / 2) / rect.height,
    y: -(clientY - rect.top - rect.height / 2) / rect.height,
  };
}

const ShaderFractal = ({
  fractal,
  iterations,
  color,
  ...canvasProps
}: ShaderFractalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<ShaderFractalHandle | null>(null);
  const zoomRef = useRef(fractal.zoom);
  const centerRef = useRef<[number, number]>([...fractal.center]);
  const paramRef = useRef<[number, number]>([...fractal.param]);
  const panRef = useRef<{ x: number; y: number } | null>(null);
  const iterationsRef = useRef(iterations);
  const colorRef = useRef(color);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    let disposed = false;
    zoomRef.current = fractal.zoom;
    centerRef.current = [...fractal.center];
    paramRef.current = [...fractal.param];

    mountShaderFractal(canvas, gl, fractal.shader).then((handle) => {
      if (!handle || disposed) {
        handle?.dispose();
        return;
      }
      handleRef.current = handle;
      handle.setMode(fractal.mode);
      handle.setIterations(iterationsRef.current);
      handle.setColor(COLOR_TO_RGB[colorRef.current] ?? COLOR_TO_RGB.yellow);
      handle.setZoom(zoomRef.current);
      handle.setCenter(centerRef.current[0], centerRef.current[1]);
      handle.setParam(paramRef.current[0], paramRef.current[1]);
    });

    return () => {
      disposed = true;
      handleRef.current?.dispose();
      handleRef.current = null;
    };
  }, [fractal]);

  useEffect(() => {
    iterationsRef.current = iterations;
    handleRef.current?.setIterations(iterations);
  }, [iterations]);

  useEffect(() => {
    colorRef.current = color;
    handleRef.current?.setColor(COLOR_TO_RGB[color] ?? COLOR_TO_RGB.yellow);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const apply = () => {
      const handle = handleRef.current;
      if (!handle) return;
      handle.setZoom(zoomRef.current);
      handle.setCenter(centerRef.current[0], centerRef.current[1]);
      handle.setParam(paramRef.current[0], paramRef.current[1]);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const point = pointerPlane(canvas, event.clientX, event.clientY);
      const previous = zoomRef.current;
      const next = Math.min(
        fractal.zoomMax,
        Math.max(fractal.zoomMin, previous * Math.exp(-event.deltaY * 0.0015)),
      );
      zoomRef.current = next;
      centerRef.current = [
        centerRef.current[0] + point.x * (1 / previous - 1 / next),
        centerRef.current[1] + point.y * (1 / previous - 1 / next),
      ];
      apply();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      panRef.current = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (fractal.pointer === "julia" && !panRef.current) {
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = 0.5 - (event.clientY - rect.top) / rect.height;
        paramRef.current = [x * 2.4, y * 2.4];
        apply();
        return;
      }
      const pan = panRef.current;
      if (!pan) return;
      const dx = event.clientX - pan.x;
      const dy = event.clientY - pan.y;
      panRef.current = { x: event.clientX, y: event.clientY };
      const height = canvas.getBoundingClientRect().height;
      centerRef.current = [
        centerRef.current[0] - dx / height / zoomRef.current,
        centerRef.current[1] + dy / height / zoomRef.current,
      ];
      apply();
    };

    const endPan = (event: PointerEvent) => {
      if (!panRef.current) return;
      panRef.current = null;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const onDoubleClick = () => {
      zoomRef.current = fractal.zoom;
      centerRef.current = [...fractal.center];
      paramRef.current = [...fractal.param];
      apply();
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endPan);
    canvas.addEventListener("pointercancel", endPan);
    canvas.addEventListener("dblclick", onDoubleClick);
    return () => {
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endPan);
      canvas.removeEventListener("pointercancel", endPan);
      canvas.removeEventListener("dblclick", onDoubleClick);
    };
  }, [fractal]);

  return (
    <canvas
      ref={canvasRef}
      {...canvasProps}
      className={`${canvasProps.className ?? ""} cursor-grab`}
    />
  );
};

export default memo(ShaderFractal);
