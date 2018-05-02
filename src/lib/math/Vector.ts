/**
 * Vector interface.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Vector {
  /**
   * Add vector to this vector.
   *
   * @param {Vector} vector other vector
   */
  addVector (vector: Vector): void

  /**
   * Subtract a vector from this vector.
   *
   * @param {Vector} vector other vector
   */
  subtractVector (vector: Vector): void

  /**
   * Multiply this vector by scalar.
   *
   * @param scalar scalar to multiply the vector
   */
  multiply (scalar: number): void

  /**
   * Divides this vector by a scalar.
   * Throws error when trying to divide by zero.
   *
   * @param {number} scalar scalar used to divide this vector
   */
  divide (scalar: number): void

  /**
   * Get the magnitude / elementsCount of this vector.
   *
   * @returns {number} magnitude / elementsCount of this vector
   */
  mag (): number

  /**
   * Negate the x and y values of this vector and return the result as a new Vector2 object.
   *
   * @returns {Vector}
   */
  negative (): Vector

  /**
   * Normalize the vector.
   */
  normalize (): void

  /**
   * Limit the vector to a maximum elementsCount.
   *
   * @param {number}max maximum elementsCount
   */
  limit (max: number): void

  /**
   * Get the distance of this vector to another vector.
   *
   * @param {Vector} vector other vector
   * @returns {number} calculated distance
   */
  distanceTo (vector: Vector): number

  /**
   * Get the dot product between this vector and another vector.
   *
   * @param {Vector} vector
   * @returns {number} the dot product of this vector and the one passed as param.
   */
  dot (vector: Vector): number

  floor (): void
}
