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
  const panRef = useRef<{ x: number; y: number } | null>(null);

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

    const applyView = () => {
      setVicsekZoom(gl, program, zoomRef.current);
      setVicsekCenter(gl, program, centerRef.current[0], centerRef.current[1]);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const prevZoom = zoomRef.current;
      const nextZoom = Math.min(64, Math.max(0.4, prevZoom * Math.exp(-event.deltaY * 0.0015)));
      zoomRef.current = nextZoom;

      const [cx, cy] = centerRef.current;
      const invPrev = 1 / prevZoom;
      const invNext = 1 / nextZoom;
      centerRef.current = [
        cx + (x - 0.5) * (invPrev - invNext),
        cy + (y - 0.5) * (invPrev - invNext),
      ];
      applyView();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      panRef.current = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      const pan = panRef.current;
      if (!pan) return;
      const rect = canvas.getBoundingClientRect();
      const dx = (event.clientX - pan.x) / rect.width;
      const dy = (event.clientY - pan.y) / rect.height;
      panRef.current = { x: event.clientX, y: event.clientY };
      centerRef.current = [
        centerRef.current[0] - dx / zoomRef.current,
        centerRef.current[1] - dy / zoomRef.current,
      ];
      applyView();
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
      zoomRef.current = 1;
      centerRef.current = [0, 0];
      applyView();
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
  }, [gl, program]);

  return (
    <canvas
      id="fractal-canvas"
      ref={canvasRef}
      {...canvasProps}
      className={`${canvasProps.className ?? ""} cursor-grab`}
    />
  );
};

export default memo(VicsekFractal);
