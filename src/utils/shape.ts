export type Matrix = [number, number, number][];

export type Vertex = "center" | number;

export type Point = {
  x: number;
  y: number;
};

// Клас Shape використовується для представлення геометричної фігури 
// з допомогою її вершин, які зберігаються у матриці verticesMatrix.
export class Shape {
  verticesMatrix: Matrix;

  constructor(vertices: Matrix) {
    this.verticesMatrix = vertices;
  }

  // Метод applyTransformation застосовує афінне перетворення до фігури,
  // множачи матрицю вершин на матрицю перетворення.
  applyTransformation(transformationMatrix: Matrix): void {
    this.verticesMatrix = matrixMultiply(
      this.verticesMatrix,
      transformationMatrix
    );
  }

  // Метод getTranslateMatrix створює матрицю зсуву для переносу фігури.
  getTranslateMatrix(dx: number, dy: number): Matrix {
    // Матриця зсуву.
    const translationMatrix: Matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [+dx, +dy, 1],
    ];
    return translationMatrix;
  }

  // Метод getVertex повертає координати вершини за індексом або центр фігури.
  getVertex(vertex: Vertex): [number, number] {
    // Перевірка на спеціальний випадок "центр".
    if (vertex === "center") {
      return this.getCenter();
    }
    // Перевірка на вихід індекса за межі.
    if (vertex >= this.verticesMatrix.length) {
      throw new Error("Vertex index out of bounds");
    }
    // Повернення координат вершини.
    const x = this.verticesMatrix[vertex][0];
    const y = this.verticesMatrix[vertex][1];
    return [x, y];
  }

  // Метод getCenter обчислює та повертає координати центру фігури.
  getCenter(): [number, number] {
    // Обчислення середньоарифметичних координат усіх вершин.
    const sum = this.verticesMatrix.reduce(
      (acc, v) => [acc[0] + v[0], acc[1] + v[1]],
      [0, 0]
    );
    return [
      sum[0] / this.verticesMatrix.length,
      sum[1] / this.verticesMatrix.length,
    ];
  }

  // Метод getScaleMatrix створює матрицю масштабування.
  getScaleMatrix(sx: number, sy: number): Matrix {
    // Матриця масштабування.
    const scalingMatrix: Matrix = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ];
    return scalingMatrix;
  }

  // Метод getRotateMatrix створює матрицю обертання на заданий кут.
  getRotateMatrix(angleDegree: number): Matrix {
    // Перетворення градусів у радіани.
    const angle = (angleDegree * Math.PI) / 180;
    // Матриця обертання.
    const rotationMatrix: Matrix = [
      [Math.cos(angle), Math.sin(angle), 0],
      [-Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ];
    return rotationMatrix;
  }

  // Метод getMirrorMatrix створює матрицю віддзеркалення відносно прямої
  getMirrorMatrix(a: number, b: number): Matrix {
    // Обчислення кута нахилу прямої.
    const angle = Math.atan(a);

    // Послідовність матричних перетворень для віддзеркалення.

    // перенос фігури в початок координат
    const translateToOrigin = this.getTranslateMatrix(0, -b);

    // поворот на кут -angle
    const rotateToXAxis = this.getRotateMatrix(-angle * (180 / Math.PI));

    // віддзеркалення відносно осі X
    const reflectAcrossX = this.getScaleMatrix(1, -1);

    // поворот на кут angle
    const reverseRotate = this.getRotateMatrix(angle * (180 / Math.PI));

    // перенос фігури в початок координат
    const reverseTranslate = this.getTranslateMatrix(0, b);

    // Послідовне застосування матриць перетворень.
    let matrix = matrixMultiply(translateToOrigin, rotateToXAxis);
    matrix = matrixMultiply(matrix, reflectAcrossX);
    matrix = matrixMultiply(matrix, reverseRotate);
    matrix = matrixMultiply(matrix, reverseTranslate);

    return matrix;
  }

  // Метод mirrorAcrossLineAndTransform віддзеркалює фігуру та застосовує зсув.
  mirrorAcrossLineAndTransform([a, b]: number[], x: number): void {
    const mirrorMatrix = this.getMirrorMatrix(a, b);
    this.applyTransformation(mirrorMatrix);
    console.log(this.verticesMatrix);
    console.log("x:", x, "y:", a * x + b);
    const translateMatrix = this.getTranslateMatrix(x, a * x + b);
    this.applyTransformation(translateMatrix);
    console.log(this.verticesMatrix);
  }
}

// Функція matrixMultiply виконує множення двох матриць.
function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  // Перевірка на відповідність розмірів матриць.
  if (a[0].length !== b.length) {
    throw new Error(
      "The number of columns in the first matrix must be equal to the number of rows in the second matrix."
    );
  }

  const result: Matrix = new Array(a.length)
    .fill(0)
    .map(() => new Array(b[0].length).fill(0)) as Matrix;

  // Множення матриць.
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < b.length; k++) {
        sum = +sum + +a[i][k] * +b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}
