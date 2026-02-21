import { memo, useEffect, useRef, useState } from "react";
import {
  initVicsekWebGL,
  setVicsekIterations,
  setVicsekColor,
  setVicsekZoom,
  setVicsekCenter,
} from "@/utils/vicsek-fractal-webgl";

const COLOR_TO_RGB: Record<string, [number, number, number]> = {
  yellow: [1, 1, 0],
  green: [0, 0.8, 0],
  blue: [0, 0, 1],
  purple: [0.5, 0, 0.5],
  red: [1, 0, 0],
};

function colorToRgb(name: string): [number, number, number] {
  return COLOR_TO_RGB[name] ?? [1, 1, 0];
}

type VicsekFractalProps = {
  iterations: number;
  color: string;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

const VicsekFractal = ({
  iterations,
  color,
  ...canvasProps
}: VicsekFractalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
  const [program, setProgram] = useState<WebGLProgram | null>(null);
  const zoomRef = useRef(1);
  const centerRef = useRef([0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const glContext = canvas.getContext("webgl2");
    if (!glContext) return;

    initVicsekWebGL(canvas, glContext).then((prog) => {
      setProgram(prog ?? null);
      setGl(glContext);
    });
  }, []);

  useEffect(() => {
    if (!gl || !program) return;
    setVicsekIterations(gl, program, Math.min(10, Math.max(0, iterations)));
  }, [iterations, gl, program]);

  useEffect(() => {
    if (!gl || !program) return;
    const [r, g, b] = colorToRgb(color);
    setVicsekColor(gl, program, r, g, b);
  }, [color, gl, program]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gl || !program) return;

    let throttle: number | null = null;
    const onWheel = (e: WheelEvent) => {
      if (throttle !== null) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      const prevZoom = zoomRef.current;
      if (e.deltaY < 0) zoomRef.current = Math.min(12, zoomRef.current * 1.2);
      else zoomRef.current = Math.max(1, zoomRef.current / 1.4);

      const [cx, cy] = centerRef.current;
      const invPrev = 1 / prevZoom;
      const invNext = 1 / zoomRef.current;
      centerRef.current = [
        cx + (x - 0.5) * (invPrev - invNext),
        cy + (y - 0.5) * (invPrev - invNext),
      ];

      setVicsekZoom(gl, program, zoomRef.current);
      setVicsekCenter(gl, program, centerRef.current[0], centerRef.current[1]);

      throttle = window.setTimeout(() => {
        throttle = null;
      }, 50);
    };

    canvas.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      canvas.removeEventListener("wheel", onWheel);
      if (throttle !== null) clearTimeout(throttle);
    };
  }, [gl, program]);

  return (
    <canvas id="fractal-canvas" ref={canvasRef} {...canvasProps} />
  );
};

export default memo(VicsekFractal);
