/**
 * Dimension class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Dimension {
  width: number
  height: number

  /**
   * Constructor.
   *
   * @param {number} width Width
   * @param {number} height Height
   */
  constructor (width: number, height: number) {
    this.width = width
    this.height = height
  }

  /**
   * Scale the dimension.
   *
   * @param {number} factor
   */
  scale (factor: number) {
    this.width *= factor
    this.height *= factor
  }
}
