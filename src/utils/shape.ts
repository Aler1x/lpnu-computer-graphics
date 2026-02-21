export type Matrix = [number, number, number][];

export type Vertex = "center" | number;

export type Point = {
  x: number;
  y: number;
};

/**
 * Class Shape is used to represent a geometric figure
 * using its vertices, which are stored in the verticesMatrix matrix.
 */
export class Shape {
  verticesMatrix: Matrix;

  constructor(vertices: Matrix) {
    this.verticesMatrix = vertices;
  }

  /**
   * Apply a transformation to the figure,
   * multiplying the vertices matrix by the transformation matrix.
   * @param transformationMatrix - The transformation matrix.
   */
  applyTransformation(transformationMatrix: Matrix): void {
    this.verticesMatrix = matrixMultiply(
      this.verticesMatrix,
      transformationMatrix
    );
  }

  /**
   * Create a translation matrix for the figure.
   * @param dx - The x coordinate of the translation.
   * @param dy - The y coordinate of the translation.
   */
  getTranslateMatrix(dx: number, dy: number): Matrix {
    const translationMatrix: Matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [+dx, +dy, 1],
    ];
    return translationMatrix;
  }

  /**
   * Get the coordinates of the vertex by index or the center of the figure.
   * @param vertex - The vertex index or "center".
   */
  getVertex(vertex: Vertex): [number, number] {
    if (vertex === "center") {
      return this.getCenter();
    }
    if (vertex >= this.verticesMatrix.length) {
      throw new Error("Vertex index out of bounds");
    }
    const x = this.verticesMatrix[vertex][0];
    const y = this.verticesMatrix[vertex][1];
    return [x, y];
  }

  /**
   * Calculate and return the coordinates of the center of the figure.
   */
  getCenter(): [number, number] {
    const sum = this.verticesMatrix.reduce(
      (acc, v) => [acc[0] + v[0], acc[1] + v[1]],
      [0, 0]
    );
    return [
      sum[0] / this.verticesMatrix.length,
      sum[1] / this.verticesMatrix.length,
    ];
  }

  /**
   * Create a scaling matrix.
   * @param sx - The x scale factor.
   * @param sy - The y scale factor.
   */
  getScaleMatrix(sx: number, sy: number): Matrix {
    const scalingMatrix: Matrix = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ];
    return scalingMatrix;
  }

  /**
   * Create a rotation matrix for the given angle.
   * @param angleDegree - The angle in degrees.
   */
  getRotateMatrix(angleDegree: number): Matrix {
    const angle = (angleDegree * Math.PI) / 180;
    const rotationMatrix: Matrix = [
      [Math.cos(angle), Math.sin(angle), 0],
      [-Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ];
    return rotationMatrix;
  }

  /**
   * Create a reflection matrix for the given line.
   * @param a - The slope of the line.
   * @param b - The y-intercept of the line.
   */
  getMirrorMatrix(a: number, b: number): Matrix {
    const angle = Math.atan(a);
    const translateToOrigin = this.getTranslateMatrix(0, -b);

    const rotateToXAxis = this.getRotateMatrix(-angle * (180 / Math.PI));
    const reflectAcrossX = this.getScaleMatrix(1, -1);
    const reverseRotate = this.getRotateMatrix(angle * (180 / Math.PI));
    const reverseTranslate = this.getTranslateMatrix(0, b);

    let matrix = matrixMultiply(translateToOrigin, rotateToXAxis);
    matrix = matrixMultiply(matrix, reflectAcrossX);
    matrix = matrixMultiply(matrix, reverseRotate);
    matrix = matrixMultiply(matrix, reverseTranslate);

    return matrix;
  }

  /**
   * Mirror the figure across a line and apply a translation.
   * @param [a, b] - The slope and y-intercept of the line.
   * @param x - The x coordinate of the translation.
   */
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

/**
 * Multiply two matrices.
 * @param a - The first matrix.
 * @param b - The second matrix.
 */
function matrixMultiply(a: Matrix, b: Matrix): Matrix {
  if (a[0].length !== b.length) {
    throw new Error(
      "The number of columns in the first matrix must be equal to the number of rows in the second matrix."
    );
  }

  const result: Matrix = new Array(a.length)
    .fill(0)
    .map(() => new Array(b[0].length).fill(0)) as Matrix;

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
