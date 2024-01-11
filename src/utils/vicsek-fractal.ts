// Функція start ініціалізує процес малювання фракталу.
// ctx - контекст для малювання на canvas.
// iterationsCount - кількість ітерацій для побудови фракталу.
// color - колір фракталу.
export function start(ctx: CanvasRenderingContext2D, iterationsCount: number, color: string): void {
    const size = ctx.canvas.width; // Використовуємо ширину canvas як розмір фракталу.
    drawFractal(ctx, iterationsCount, 0, 0, size, color); // Починаємо малювання фракталу.
  }
  
  // Функція drawFractal рекурсивно малює фрактал Вічека.
  // ctx - контекст для малювання на canvas.
  // levels - поточний рівень рекурсії.
  // x, y - початкові координати для малювання фракталу.
  // size - розмір фракталу.
  // color - колір фракталу.
  function drawFractal(ctx: CanvasRenderingContext2D, levels: number, x: number = 0, y: number = 0, size: number = 300, color: string) {
    if (levels === 0) {
      // Базовий випадок рекурсії: якщо рівень рекурсії 0, малюємо квадрат.
      ctx.fillStyle = color; // Встановлюємо колір заливки.
      ctx.fillRect(x, y, size, size); // Малюємо квадрат.
    } else {
      // Якщо рівень рекурсії більший ніж 0, розбиваємо квадрат на 9 менших.
      const size3 = size / 3; // Розмір одного з 9 менших квадратів.
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Малюємо менший квадрат, якщо його індекси парні (частина масиву фракталу).
          if ((i + j) % 2 === 0) {
            drawFractal(ctx, levels - 1, x + i * size3, y + j * size3, size3, color); // Рекурсивний виклик для малювання меншого квадрата.
          }
        }
      }
    }
  }
  