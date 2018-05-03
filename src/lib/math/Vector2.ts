import Vector from './Vector'
import Cloneable from '../util/Cloneable'

/**
 * 2D vector implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Vector2 implements Vector, Cloneable {
  x: number
  y: number

  /**
   * Default constructor. Sets x and y values.
   *
   * @param {number} x initial x value
   * @param {number} y initial y value
   */
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Static addVector method to combine two vectors into a new one.
   *
   * @param {Vector2} v1 first vector
   * @param {Vector2} v2 second vector
   * @returns {Vector2} combined vector
   */
  static addVector (v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
  }

  /**
   * Subtract two vector from each other and put the result into a new vector.
   *
   * @param {Vector2} v1 first vector
   * @param {Vector2} v2 second vector
   * @returns {Vector2} resulting vector
   */
  static subtractVector (v1: Vector2, v2: Vector2): Vector2 {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }

  /**
   * Multiplies a vector with a scalar and returns the resulting vector.
   *
   * @param {Vector2} vector initial vector
   * @param {number} scalar scalar to scale the vector
   * @returns {Vector2} the resulting vector
   */
  static multiply (vector: Vector2, scalar: number): Vector2 {
    return new Vector2(vector.x * scalar, vector.y * scalar)
  }

  /**
   * Divides a vector by a scalar and returns the result in a new vector.
   * Throws error if trying to divide by zero.
   *
   * @param {Vector2} vector vector to divide
   * @param {number} scalar scalar used to divide vector
   * @returns {Vector2} resulting vector
   */
  static divide (vector: Vector2, scalar: number): Vector2 {
    if (scalar === 0) {
      throw new Error('cannot divide vector by scalar with value "0"')
    }
    return new Vector2(vector.x / scalar, vector.y / scalar)
  }

  /**
   * Calculate distance between two vectors.
   *
   * @param {Vector2} start
   * @param {Vector2} destination
   * @returns {number}
   */
  static distance (start: Vector2, destination: Vector2): number {
    return Math.sqrt(Math.pow(destination.x - start.x, 2) + Math.pow(destination.y - start.y, 2))
  }

  /**
   * Calculate linear interpolation between to vectors
   * @param {Vector2} start
   * @param {Vector2} destination
   * @param {number} n
   */
  static lerp (start: Vector2, destination: Vector2, n: number): Vector2 {
    return new Vector2(
      (1 - n) * start.x + n * destination.x,
      (1 - n) * start.y + n * destination.y
    )
  }

  /**
   * Set vector with both x and y values.
   *
   * @param {number} x new x value
   * @param {number} y new y value
   */
  set (x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * Set vector location to another vector.
   *
   * @param {Vector2} vector other vector
   */
  setVector (vector: Vector2): void {
    this.x = vector.x
    this.y = vector.y
  }

  /**
   * Add x and y to this vector.
   *
   * @param {number} x x value
   * @param {number} y y value
   */
  add (x: number, y: number): void {
    this.x += x
    this.y += y
  }

  /**
   * Add vector to this vector.
   *
   * @param {Vector2} vector other vector
   */
  addVector (vector: Vector2): void {
    this.x += vector.x
    this.y += vector.y
  }

  /**
   * Subtraxt x and y from this vector.
   *
   * @param {number} x x value
   * @param {number} y y value
   */
  subtract (x: number, y: number): void {
    this.x -= x
    this.y -= y
  }

  /**
   * Subtract a vector from this vector.
   *
   * @param {Vector2} vector other vector
   */
  subtractVector (vector: Vector2): void {
    this.x -= vector.x
    this.y -= vector.y
  }

  /**
   * Multiply this vector by scalar.
   *
   * @param scalar scalar to multiply the vector
   */
  multiply (scalar: number): void {
    this.x *= scalar
    this.y *= scalar
  }

  /**
   * Divides this vector by a scalar.
   * Throws error when trying to divide by zero.
   *
   * @param {number} scalar scalar used to divide this vector
   */
  divide (scalar: number): void {
    if (scalar === 0) {
      throw new Error('cannot divide vector by "0"')
    }
    this.x /= scalar
    this.y /= scalar
  }

  /**
   * Get the magnitude / elementsCount of this vector.
   *
   * @returns {number} magnitude / elementsCount of this vector
   */
  mag (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * Negate the x and y values of this vector and return the result as a new Vector2 object.
   *
   * @returns {Vector2}
   */
  negative (): Vector2 {
    return new Vector2(-this.x, -this.y)
  }

  /**
   * Normalize the vector.
   */
  normalize (): void {
    let magnitude = this.mag()
    if (magnitude !== 0) {
      this.divide(magnitude)
    }
  }

  /**
   * Limit the vector to a maximum elementsCount.
   *
   * @param {number} max maximum elementsCount
   */
  limit (max: number): void {
    if (Math.floor(this.mag()) > max) {
      this.normalize()
      this.multiply(max)
    }
  }

  /**
   * Get the distance of this vector to another vector.
   *
   * @param {Vector2} vector other vector
   * @returns {number} calculated distance
   */
  distanceTo (vector: Vector2): number {
    return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2))
  }

  /**
   * Get the dot product between this vector and another vector.
   *
   * @param {Vector2} vector
   * @returns {number} the dot product of this vector and the one passed as param.
   */
  dot (vector: Vector2): number {
    return this.x * vector.x + this.y * vector.y
  }

  floor (): Vector2 {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    return this
  }

  ceil (): void {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
  }

  round (): Vector2 {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    return this
  }

  /**
   * Linear interpolation method
   *
   * @param {Vector2} vector destination vector.
   * @param {number} n Normal value
   */
  lerp (vector: Vector2, n: number): void {
    this.x = (1 - n) * this.x + n * vector.x
    this.y = (1 - n) * this.y + n * vector.y
  }

  equals (vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y
  }

  /**
   * Create a clone of this vector.
   *
   * @returns {Vector2} cloned vector
   */
  clone (): Vector2 {
    return new Vector2(this.x, this.y)
  }
}
