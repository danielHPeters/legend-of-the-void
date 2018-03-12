import Matrix from './Matrix'

/**
 * Matrix factory:
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class MatrixFactory {

  /**
   * Creates a matrix with an array.
   *
   * @param mArray The array used to create the matrix
   * @returns {Matrix} The generated matrix object
   */
  static createMatrix (mArray): Matrix {
    const length = mArray[0].length
    for (let i = 1; i < mArray.length; i++) {
      if (mArray[i].length !== length) {
        return null
      }
    }
    return new Matrix(mArray)
  }
}
