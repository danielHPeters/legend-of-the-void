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

  constructor (x1: number, y1: number, x2: number, y2: number) {
    this.start = new Point(x1, y1)
    this.end = new Point(x2, y2)
  }

  getSlope (): number {
    return (this.end.y - this.start.y) / (this.end.x - this.start.x)
  }
}
