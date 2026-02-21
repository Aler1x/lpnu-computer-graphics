import { memo, useEffect, useRef, useState } from "react";
import init, {
  setHueShift,
  setIterations,
  setMousePos,
} from "@/utils/newton-fractal";

type NewtonFractalProps = {
  iterations?: number;
  hueColor?: HueColor;
} & React.CanvasHTMLAttributes<HTMLCanvasElement>;

const colorHueCoefficients = {
  yellow: 0.2,
  green: 0.4,
  blue: 0.6,
  purple: 0.9,
  red: 0.0,
  colorful: -1,
};

export type HueColor = keyof typeof colorHueCoefficients;

const NewtonFractal = ({
  iterations = 50,
  hueColor = "colorful",
  ...canvasProps
}: NewtonFractalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
  const [program, setProgram] = useState<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2")!;
    if (!gl) {
      console.error("WebGL 2.0 not supported");
    }

    init(canvas, gl).then(setProgram);
    setGl(gl);

    const onMouseMove = (e: MouseEvent) => {
      const mousePosX = e.clientX - canvas.getBoundingClientRect().x;
      const mousePosY = e.clientY - canvas.getBoundingClientRect().y;
      setMousePos(gl, mousePosX, e.clientY - mousePosY);
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!gl || !program) return;
    setIterations(gl, program, iterations);
  }, [iterations, gl, program]);

  useEffect(() => {
    if (!gl || !program) return;
    setHueShift(gl, program, colorHueCoefficients[hueColor]);
  }, [hueColor, gl, program]);

  return (
    <canvas id="fractal-canvas" ref={canvasRef} {...canvasProps} />
  );
};

export default memo(NewtonFractal);
