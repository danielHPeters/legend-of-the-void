import Point from './Point'

/**
 * Class representing a linear function.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class LinearFunction {
  start: Point
  end: Point

  /**
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   */
  constructor (x1: number, y1: number, x2: number, y2: number) {
    this.start = new Point(x1, y1)
    this.end = new Point(x2, y2)
  }

  /**
   *
   * @returns {number}
   */
  getSlope (): number {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x)
  }
}
