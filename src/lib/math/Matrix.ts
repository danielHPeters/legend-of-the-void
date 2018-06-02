import Cloneable from '../util/Cloneable'

/**
 * Matrix class used for representing multidimensional matrices.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Matrix implements Cloneable {
  rows: number
  columns: number
  mArray: number[][]

  /**
   * Default constructor.
   *
   * @param array Matrix array
   */
  constructor (array: number[][]) {
    if (!this.arrayIsValidMatrix(array)) {
      throw new Error('The passed matrix array is malformed: ' + array)
    }
    this.mArray = array
    this.rows = array.length
    this.columns = array[0].length
  }

  /**
   * Check if all arrays contained in the two dimensional array are of the same length.
   * All arrays should be same length as the first array.
   *
   * @param array
   */
  arrayIsValidMatrix (array: number[][]): boolean {
    const length = array[0].length
    return array.filter(element => element.length !== length).length === 0
  }

  /**
   * Set the matrix from an array.
   * @param array
   */
  set (array: number[][]): void {
    if (!this.arrayIsValidMatrix(array)) {
      throw new Error('The passed matrix array is malformed: ' + array)
    }
    this.rows = array.length
    this.columns = array[0].length
    this.mArray = array

  }

  /**
   * Add another matrix to this matrix.
   * The dimension of the other matrix must be equal to this.
   *
   * @param matrix
   */
  add (matrix: Matrix): void {
    if (this.equals(matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.mArray[i][j] += matrix.mArray[i][j]
        }
      }
    }
  }

  /**
   * Subtract another matrix from this matrix.
   * The dimension of the other matrix must be equal to this.
   *
   * @param matrix
   */
  subtract (matrix: Matrix): void {
    if (this.equals(matrix)) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.mArray[i][j] -= matrix.mArray[i][j]
        }
      }
    }
  }

  /**
   * Matrix multiplication algorithm.
   *
   * @param matrix Another matrix
   * @returns Resulting matrix
   */
  multiply (matrix: Matrix): Matrix {
    let newArray = []
    if (this.columns === matrix.rows) {
      for (let i = 0; i < this.rows; i++) {
        newArray[i] = []
        for (let j = 0; j < matrix.columns; j++) {
          let val = 0
          for (let k = 0; k < this.columns; k++) {
            val += this.mArray[i][k] * matrix.mArray[k][j]
          }
          newArray[i].push(val)
        }
      }
    } else {
      return null
    }
    return new Matrix(newArray)
  }

  /**
   * Multiply this matrix by a scalar.
   *
   * @param scalar Scalar by which the matrix is multiplied by
   */
  multScalar (scalar: number): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.mArray[i][j] *= scalar
      }
    }
  }

  /**
   * Transposes this matrix.
   */
  transpose (): void {
    let array = []
    for (let i = 0; i < this.columns; i++) {
      array[i] = []
      for (let j = 0; j < this.rows; j++) {
        array[i][j] = this.mArray[j][i]
      }
    }

    this.rows = array.length
    this.columns = array[0].length
    this.mArray = array
  }

  rotate (direction: number): void {
    this.transpose()
    if (direction > 0) {
      this.mArray.forEach(row => row.reverse())
    } else {
      this.mArray.reverse()
    }
  }

  /**
   * Check if the row and column length are equal to another matrix's.
   *
   * @param other Other Matrix
   * @returns Returns true if the lengths match
   */
  equals (other: Matrix): boolean {
    return other.rows === this.rows && other.columns === this.columns
  }

  /**
   * Generate an exact copy of this matrix.
   *
   * @returns A copy of this matrix
   */
  clone (): Matrix {
    let array = []
    this.mArray.forEach(arr => array.push(arr.slice(0)))
    return new Matrix(Array.from(array))
  }
}
