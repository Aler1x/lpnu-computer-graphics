// Імпортуємо необхідні утиліти для роботи з WebGL.
import {
  setUniform, resizeCanvasToDisplaySize, createProgram, createShader
 } from "./webgl.js"
 
 // Змінні для зберігання вихідного коду шейдерів.
 let vertexCode: string, fragmentCode: string;
 
 // Асинхронна функція для ініціалізації WebGL.
 async function init(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
   // Завантажуємо код вершинного та фрагментного шейдерів.
   vertexCode = await (await fetch('./vertex_shader.vert')).text();
   fragmentCode = await (await fetch('./fragment_shader.frag')).text();
   // Створюємо та повертаємо WebGL програму.
   return createCanvas(canvas, gl);
 }
 
 // Функція для створення WebGL програми з шейдерів.
 function createCanvas(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
   // Перевіряємо, чи вдалося завантажити код шейдерів.
   if (!vertexCode || !fragmentCode) {
     console.warn("Vertex or Fragment code not loaded yet!")
     return null;
   }
 
   // Створюємо шейдери з завантаженого коду.
   const vertexShader: WebGLShader = createShader(gl, gl.VERTEX_SHADER, vertexCode)!;
   const fragmentShader: WebGLShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentCode)!;
 
   // Створюємо WebGL програму та пов'язуємо шейдери з нею.
   let program: WebGLProgram;
   try {
     program = createProgram(gl, vertexShader, fragmentShader)!;
     console.info("Compiled!", program)
   } catch (e) {
     throw "Didn't compile!";
   }
 
   // Встановлюємо атрибути для роботи з вершинами.
   const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
   const positionBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 
   // Визначаємо позиції для двох трикутників, які утворюють прямокутник.
   const positions = [
     -1.0, -1.0, // Точка 1
     1.0, -1.0,  // Точка 2
     -1.0, 1.0,  // Точка 3
     -1.0, 1.0,  // Точка 4
     1.0, -1.0,  // Точка 5
     1.0, 1.0    // Точка 6
   ];
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
 
   // Встановлюємо інформацію про вершинний атрибут.
   const vao = gl.createVertexArray();
   gl.bindVertexArray(vao);
   gl.enableVertexAttribArray(positionAttributeLocation);
 
   // Визначаємо параметри для інтерпретації даних буферу вершин.
   const size = 2;          // Кількість компонентів на ітерацію.
   const type = gl.FLOAT;   // Тип даних.
   const normalize = false; // Не нормалізуємо дані.
   const stride = 0;        // Кількість байтів між початками послідовних вершин.
   const offset = 0;        // Зсув у буфері.
   gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
 
   // Налаштовуємо розмір полотна відповідно до розміру відображення.
   resizeCanvasToDisplaySize(canvas);
   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 
   // Встановлюємо колір для очищення полотна.
   gl.clearColor(0, 0, 0, 0);
   gl.clear(gl.COLOR_BUFFER_BIT);
 
   // Використовуємо нашу програму для рендерингу.
   gl.useProgram(program);
   gl.bindVertexArray(vao);
 
   // Встановлюємо уніформні змінні для шейдерної програми.
   const programLocation = gl.getParameter(gl.CURRENT_PROGRAM);
   setUniform(gl, programLocation, "1f", "width", gl.canvas.width);
   setUniform(gl, programLocation, "1f", "height", gl.canvas.height);
   setPower(gl, programLocation, 4);
 
   // Викликаємо функцію render для початку циклу рендерингу.
   render(gl);
 
   // Повертаємо програму для можливого зовнішнього використання.
   return program;
 }
 
 // Функція render викликається кожного разу, коли потрібно оновити візуалізацію.
 function render(gl: WebGL2RenderingContext) {
   // Рендеримо трикутники, які утворюють прямокутник.
   const primitiveType = gl.TRIANGLES;
   const offset = 0;
   const count = 6;
   gl.drawArrays(primitiveType, offset, count);
 
   // Плануємо наступний кадр рендерингу.
   window.requestAnimationFrame(() => render(gl));
 }
 
 // Функції для встановлення уніформних змінних у шейдерній програмі.
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
 
 // Експорт функції init для ініціалізації в інших модулях.
 export default init;
 