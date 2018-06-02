/**
 * Rectangle class for camera.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Rectangle {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number

  /**
   *
   * @param left
   * @param top
   * @param width
   * @param height
   */
  constructor (left: number, top: number, width: number, height: number) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.right = this.left + this.width
    this.bottom = this.top + this.height
  }

  /**
   *
   * @param left
   * @param top
   * @param width
   * @param height
   */
  public set (left: number, top: number, width?: number, height?: number): void {
    this.left = left
    this.top = top
    this.width = width || this.width
    this.height = height || this.height
    this.right = (this.left + this.width)
    this.bottom = (this.top + this.height)
  }

  /**
   *
   * @param other
   * @returns
   */
  within (other: Rectangle): boolean {
    return (other.left <= this.left &&
      other.right >= this.right &&
      other.top <= this.top &&
      other.bottom >= this.bottom)
  }

  /**
   *
   * @param other
   * @returns
   */
  overlaps (other: Rectangle): boolean {
    return (this.left < other.right &&
      other.left < this.right &&
      this.top < other.bottom &&
      other.top < this.bottom)
  }
}
