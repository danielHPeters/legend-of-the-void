/**
 * Vector class representing a coordinate on a 2d grid.
 *
 * @author Daniel Peters
 * @version 1.0
 */
import ICloneable from '../interfaces/ICloneable'

export default class Vector2 implements ICloneable {
  x: number
  y: number

  /**
   * Constructor.
   *
   * @param {number} x X value
   * @param {number} y Y value
   */
  constructor (x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Set the x and y value of this point.
   *
   * @param {number} x X value
   * @param {number} y Y value
   */
  public set (x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Set point position by the values of another point.
   *
   * @param {Vector2} other Other point
   */
  public setByVector (other: Vector2) {
    this.x = other.x
    this.y = other.y
  }

  /**
   * Add values to this point.
   *
   * @param {number} x
   * @param {number} y
   */
  public add (x: number, y: number) {
    this.x += x
    this.y += y
  }

  /**
   * Add point to this point.
   *
   * @param {Vector2} other
   */
  public addVector (other: Vector2) {
    this.x += other.x
    this.y += other.y
  }

  public multiply (scalar: number) {
    this.x *= scalar
    this.y *= scalar
  }

  public clone (): Vector2 {
    return new Vector2(this.x, this.y)
  }

  get length (): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  set length (value: number) {
    const f = value / this.length
    this.x *= f
    this.y *= f
  }
}
