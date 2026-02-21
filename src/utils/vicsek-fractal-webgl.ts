import {
  setUniform,
  resizeCanvasToDisplaySize,
  createProgram,
  createShader,
} from "./webgl";

let vertexCode: string;
let fragmentCode: string;
let vicsekVao: WebGLVertexArrayObject | null = null;

async function loadShaders(): Promise<void> {
  const [v, f] = await Promise.all([
    fetch("/vertex_shader.vert").then((r) => r.text()),
    fetch("/vicsek_fragment_shader.frag").then((r) => r.text()),
  ]);
  vertexCode = v;
  fragmentCode = f;
}

function createVicsekProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  if (!vertexCode || !fragmentCode) return null;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexCode);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentCode);
  if (!vertexShader || !fragmentShader) return null;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return null;

  const positionLoc = gl.getAttribLocation(program, "a_position");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]),
    gl.STATIC_DRAW
  );

  vicsekVao = gl.createVertexArray();
  gl.bindVertexArray(vicsekVao);
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  return program;
}

export async function initVicsekWebGL(
  canvas: HTMLCanvasElement,
  gl: WebGL2RenderingContext
): Promise<WebGLProgram | null> {
  await loadShaders();
  const program = createVicsekProgram(gl);
  if (!program) return null;

  gl.useProgram(program);
  if (vicsekVao) gl.bindVertexArray(vicsekVao);

  resizeCanvasToDisplaySize(canvas);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  setUniform(gl, program, "1f", "width", gl.canvas.width);
  setUniform(gl, program, "1f", "height", gl.canvas.height);
  setUniform(gl, program, "1i", "iterations", 5);
  setUniform(gl, program, "3f", "fractalColor", [1, 1, 0]);
  setUniform(gl, program, "1f", "zoom", 1);
  setUniform(gl, program, "2f", "center", [0, 0]);

  render(gl, program, canvas);
  return program;
}

function render(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  canvas: HTMLCanvasElement
): void {
  if (resizeCanvasToDisplaySize(canvas)) {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    setUniform(gl, program, "1f", "width", gl.canvas.width);
    setUniform(gl, program, "1f", "height", gl.canvas.height);
  }
  if (vicsekVao) gl.bindVertexArray(vicsekVao);
  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(() => render(gl, program, canvas));
}

export function setVicsekIterations(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  iterations: number
): void {
  setUniform(gl, program, "1i", "iterations", Math.min(10, Math.max(0, iterations)));
}

export function setVicsekColor(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  r: number,
  g: number,
  b: number
): void {
  setUniform(gl, program, "3f", "fractalColor", [r, g, b]);
}

export function setVicsekZoom(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  zoom: number
): void {
  setUniform(gl, program, "1f", "zoom", zoom);
}

export function setVicsekCenter(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  x: number,
  y: number
): void {
  setUniform(gl, program, "2f", "center", [x, y]);
}
