import { FC, memo, useEffect, useRef, useState } from 'react'
import init, { setHueShift, setIterations, setMousePos } from '../../../../utils/newton-fractal';
import "./NewtonFractal.css";

type OwnProps = {
  iterations?: number;
  hueColor?: HueColor;
}

const colorHueCoefficients = {
  yellow: 0.2,
  green: 0.4,
  blue: 0.6,
  purple: 0.9,
  red: 0.0,
  colorful: -1,
} 

export type HueColor = keyof typeof colorHueCoefficients;

const _NewtonFractal: FC<OwnProps> = ({ iterations = 50, hueColor = "colorful" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);
  const [program, setProgram] = useState<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2")!;
    if (!gl) {
      console.error('WebGL 2.0 not supported');
    }

    init(canvas, gl).then(setProgram);
    setGl(gl);

    const onMouseMove = (e: MouseEvent) => {
      const mousePosX = e.clientX - canvas.getBoundingClientRect().x;
      const mousePosY = e.clientY - canvas.getBoundingClientRect().y;
      setMousePos(gl, mousePosX, e.clientY - mousePosY);
    }
    
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, []);

  useEffect(() => {
    if (!gl || !program) return;
    setIterations(gl, program, iterations);
    console.log(iterations);
  }, [iterations, gl, program])

  useEffect(() => {
    if (!gl || !program) return;
    setHueShift(gl, program, colorHueCoefficients[hueColor]);
  }, [hueColor, gl, program])

  
  return (
    <canvas id="fractal-canvas" width="1000" height="500" ref={canvasRef} />
  )
}

export const NewtonFractal = memo(_NewtonFractal);
