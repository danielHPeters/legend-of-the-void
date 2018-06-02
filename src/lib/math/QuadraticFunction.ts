/**
 * Class representing a quadratic function.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class QuadraticFunction {
  getZeroPoint (a: number, b: number, c: number): void {
    const check = (b * b) - (4 * a * c)

    if (check > 0) {
      this.calculate(check)
    } else if (check === 0) {
      // Not implemented.
    } else {
      return
    }
  }

  calculate (check: number): number {
    return 1
  }
}
