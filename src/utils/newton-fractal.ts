/**
 * Import necessary utilities for working with WebGL.
 */
import {
  setUniform, resizeCanvasToDisplaySize, createProgram, createShader
 } from "./webgl.js"
 
 /**
  * Variables to store the original code of the shaders.
  */
 let vertexCode: string, fragmentCode: string;
 
 /**
  * Asynchronous function to initialize WebGL.
  */
 async function init(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
   /**
    * Load the code of the vertex and fragment shaders.
    */
   vertexCode = await (await fetch('./vertex_shader.vert')).text();
   fragmentCode = await (await fetch('./fragment_shader.frag')).text();
   /**
    * Create and return the WebGL program.
    */
   return createCanvas(canvas, gl);
 }
 
 /**
  * Function to create a WebGL program with shaders.
  */
 function createCanvas(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
   /**
    * Check if the code of the shaders was loaded successfully.
    */
   if (!vertexCode || !fragmentCode) {
     console.warn("Vertex or Fragment code not loaded yet!")
     return null;
   }
 
   /**
    * Create shaders from the loaded code.
    */
   const vertexShader: WebGLShader = createShader(gl, gl.VERTEX_SHADER, vertexCode)!;
   const fragmentShader: WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentCode)!;
 
   /**
    * Create a WebGL program and link the shaders to it.
    */
   let program: WebGLProgram;
   try {
     program = createProgram(gl, vertexShader, fragmentShader)!;
     console.info("Compiled!", program)
   } catch {
     throw "Didn't compile!";
   }
 
   /**
    * Set attributes for working with vertices.
    */
   const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
   const positionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 
   /**
    * Define the positions for two triangles that form a rectangle.
    */
   const positions = [
     -1.0, -1.0, // Точка 1
     1.0, -1.0,  // Точка 2
     -1.0, 1.0,  // Точка 3
     -1.0, 1.0,  // Точка 4
     1.0, -1.0,  // Точка 5
     1.0, 1.0    // Точка 6
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
 
   /**
    * Set information about the vertex attribute.
    */
   const vao = gl.createVertexArray();
   gl.bindVertexArray(vao);
   gl.enableVertexAttribArray(positionAttributeLocation);
 
   /**
    * Define the parameters for interpreting the data of the vertex buffer.
    */
   const size = 2;          // The number of components per iteration.
   const type = gl.FLOAT;   // The type of data.
   const normalize = false; // Do not normalize the data.
   const stride = 0;        // The number of bytes between the beginnings of consecutive vertices.
   const offset = 0;        // The offset in the buffer.
   gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
 
   // Set the size of the canvas according to the size of the display.
   resizeCanvasToDisplaySize(canvas);
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 
   // Set the color for clearing the canvas.
   gl.clearColor(0, 0, 0, 0);
   gl.clear(gl.COLOR_BUFFER_BIT);
 
   // Use our program for rendering.
   gl.useProgram(program);
   gl.bindVertexArray(vao);
 
   // Set uniform variables for the shader program.
   const programLocation = gl.getParameter(gl.CURRENT_PROGRAM);
   setUniform(gl, programLocation, "1f", "width", gl.canvas.width);
   setUniform(gl, programLocation, "1f", "height", gl.canvas.height);
   setPower(gl, programLocation, 4);
 
   // Call the render function to start the rendering loop.
   render(gl);
 
   // Return the program for possible external use.
   return program;
 }
 
 // The render function is called every time the visualization needs to be updated.
 function render(gl: WebGL2RenderingContext) {
   // Render the triangles that form a rectangle.
   const primitiveType = gl.TRIANGLES;
   const offset = 0;
   const count = 6;
   gl.drawArrays(primitiveType, offset, count);
 
   // Plan the next frame of rendering.
   window.requestAnimationFrame(() => render(gl));
 }
 
 // Functions to set uniform variables in the shader program.
 export function setPower(gl: WebGL2RenderingContext, program: WebGLProgram, power: number) {
   setUniform(gl, program, "1i", "power", power);
 }
 
 export function setIterations(gl: WebGL2RenderingContext, program: WebGLProgram, iterations: number) {
   setUniform(gl, program, "1i", "iterations", iterations);
 }
 
 export function setMousePos(gl: WebGL2RenderingContext, x: number, y: number) {
   const programLocation = gl.getParameter(gl.CURRENT_PROGRAM);
   setUniform(gl, programLocation, "2f", "mousepos", [x, y]);
 }
 
 export function setHueShift(gl: WebGL2RenderingContext, program: WebGLProgram, color: number) {
   setUniform(gl, program, "1f", "hueShift", color);
 }
 
 // Export the init function for initialization in other modules.
 export default init;
 