export type Matrix = [number, number, number][];

export type Vertex = "center" | number;

export type Point = {
  x: number;
  y: number;
};

// TODO: check if it correctly works

export class Shape {
  verticesMatrix: Matrix;

  constructor(vertices: Matrix) {
    this.verticesMatrix = vertices;
  }

  applyTransformation(transformationMatrix: Matrix): void {
    this.verticesMatrix = matrixMultiply(
      this.verticesMatrix,
      transformationMatrix
    );
  }

  getTranslateMatrix(dx: number, dy: number): Matrix {
    const translationMatrix: Matrix = [
      [1, 0, 0],
      [0, 1, 0],
      [+dx, +dy, 1],
    ];
    return translationMatrix;
  }

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

  getScaleMatrix(sx: number, sy: number): Matrix {
    const scalingMatrix: Matrix = [
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1],
    ];
    return scalingMatrix;
  }

  getRotateMatrix(angleDegree: number): Matrix {
    const angle = (angleDegree * Math.PI) / 180;
    const rotationMatrix: Matrix = [
      [Math.cos(angle), Math.sin(angle), 0],
      [-Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1],
    ];
    return rotationMatrix;
  }

  getMirrorMatrix(a: number, b: number): Matrix {
    const angle = Math.atan(a);

    // Translation to origin
    const translateToOrigin = this.getTranslateMatrix(0, -b);

    // Rotation to align with x-axis
    const rotateToXAxis = this.getRotateMatrix(-angle * (180 / Math.PI));

    // Reflection across x-axis
    const reflectAcrossX = this.getScaleMatrix(1, -1);

    // Reverse rotation
    const reverseRotate = this.getRotateMatrix(angle * (180 / Math.PI));

    // Reverse translation
    const reverseTranslate = this.getTranslateMatrix(0, b);

    // Combine transformations
    let matrix = matrixMultiply(translateToOrigin, rotateToXAxis);
    matrix = matrixMultiply(matrix, reflectAcrossX);
    matrix = matrixMultiply(matrix, reverseRotate);
    matrix = matrixMultiply(matrix, reverseTranslate);

    return matrix;
  }

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
