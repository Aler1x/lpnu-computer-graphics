import {
  createProgram,
  createShader,
  setUniform,
} from "./webgl";

function resizeForDisplay(canvas: HTMLCanvasElement) {
  const density = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(canvas.clientWidth * density));
  const height = Math.max(1, Math.round(canvas.clientHeight * density));
  const changed = canvas.width !== width || canvas.height !== height;
  if (changed) {
    canvas.width = width;
    canvas.height = height;
  }
  return changed;
}

const QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

export type ShaderFractalHandle = {
  setIterations: (value: number) => void;
  setColor: (rgb: [number, number, number]) => void;
  setZoom: (value: number) => void;
  setCenter: (x: number, y: number) => void;
  setParam: (x: number, y: number) => void;
  setMode: (value: number) => void;
  dispose: () => void;
};

let vertexCode = "";

async function loadVertex(): Promise<string> {
  if (vertexCode) return vertexCode;
  vertexCode = await fetch("/vertex_shader.vert").then((response) => response.text());
  return vertexCode;
}

export async function mountShaderFractal(
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext,
  fragmentUrl: string,
): Promise<ShaderFractalHandle | null> {
  const [vertexSource, fragmentSource] = await Promise.all([
    loadVertex(),
    fetch(fragmentUrl).then((response) => response.text()),
  ]);

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  const buffer = gl.createBuffer();
  const vao = gl.createVertexArray();
  const positionLoc = gl.getAttribLocation(program, "a_position");

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  let frame = 0;
  let running = true;

  const draw = () => {
    if (!running) return;
    if (resizeForDisplay(canvas)) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      setUniform(gl, program, "2f", "u_resolution", [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ]);
    }
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    frame = requestAnimationFrame(draw);
  };

  gl.useProgram(program);
  resizeForDisplay(canvas);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  setUniform(gl, program, "2f", "u_resolution", [
    gl.drawingBufferWidth,
    gl.drawingBufferHeight,
  ]);
  draw();

  return {
    setIterations: (value) => setUniform(gl, program, "1i", "u_iterations", value),
    setColor: (rgb) => setUniform(gl, program, "3f", "u_color", rgb),
    setZoom: (value) => setUniform(gl, program, "1f", "u_zoom", value),
    setCenter: (x, y) => setUniform(gl, program, "2f", "u_center", [x, y]),
    setParam: (x, y) => setUniform(gl, program, "2f", "u_param", [x, y]),
    setMode: (value) => setUniform(gl, program, "1i", "u_mode", value),
    dispose: () => {
      running = false;
      cancelAnimationFrame(frame);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
    },
  };
}
